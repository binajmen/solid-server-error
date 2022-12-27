import { Gender, Language, Role } from "@prisma/client";
import { Authenticator } from "@solid-auth/core";
import { CredentialsStrategy } from "@solid-auth/credentials";
import { GoogleStrategy } from "@solid-auth/socials";
import bcrypt from "bcryptjs";
import { createCookieSessionStorage, ServerError } from "solid-start";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/prisma";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    secrets: [serverEnv.SESSION_SECRET],
    secure: true,
    maxAge: 60 * 60 * 12,
    httpOnly: true,
  },
});

export type AuthUser = {
  id: string;
  email: string;
  role: Record<string, Role>;
  super?: boolean;
};

export const authenticator = new Authenticator<AuthUser>(sessionStorage);

authenticator.use(
  new CredentialsStrategy(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      include: {
        password: true,
        organisations: true,
      },
    });

    if (!user || !user.password) {
      throw new Error("Wrong email or password");
    }

    const isValid = await bcrypt.compare(input.password, user.password.hash);

    if (!isValid) {
      throw new Error("Wrong email or password");
    }

    return {
      id: user.id,
      email: user.email,
      super: user.isSuper ?? undefined,
      role: user.organisations.reduce(
        (acc, cur) => ({ ...acc, [cur.organisationId]: cur.role }),
        {} as AuthUser["role"]
      ),
    };
  })
);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
      callbackURL: serverEnv.SITE_URL + "/api/auth/github/callback",
    },
    async ({ profile }) => {
      let user = await prisma.user.findUnique({
        where: { id: profile.id },
        include: { organisations: true },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            id: profile.id,
            email: profile._json.email ?? profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            age: 0,
            gender: Gender.other,
            lang: Language.en,
            isSuper: false,
          },
          include: { organisations: true },
        });
      }

      return {
        id: user.id,
        email: user.email,
        super: user.isSuper ?? undefined,
        role: user.organisations.reduce(
          (acc, cur) => ({ ...acc, [cur.organisationId]: cur.role }),
          {} as AuthUser["role"]
        ),
      };
    }
  )
);

export async function isUser(request: Request, lang = "en") {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: `/${lang}/login`,
  });

  return user;
}

export async function isManager(request: Request) {
  const user = await isUser(request);
  return Object.entries(user.role).length > 0;
}

export async function isManagerOf(request: Request, organisationId: string) {
  const user = await isUser(request);

  if (
    user.role[organisationId] !== Role.manager &&
    user.role[organisationId] !== Role.admin &&
    !user.super
  ) {
    throw new ServerError("Unauthorized", { status: 401 });
  }

  return user;
}

export async function isAdminOf(request: Request, organisationId: string) {
  const user = await isUser(request);

  if (user.role[organisationId] !== Role.admin && !user.super) {
    throw new ServerError("Unauthorized", { status: 401 });
  }

  return user;
}

export async function isSuper(request: Request) {
  const user = await isUser(request);

  if (!user.super) {
    throw new ServerError("Unauthorized", { status: 401 });
  }

  return user;
}
