import { useI18n } from "@solid-primitives/i18n";
import { createSignal, Show } from "solid-js";
import {
  refetchRouteData,
  RouteDataArgs,
  Title,
  useRouteData,
} from "solid-start";
import { createServerData$ } from "solid-start/server";
import Input from "~/components/input";
import { authenticator } from "~/server/auth";
import { authClient } from "~/utils/auth";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async (lang, { request }) => {
      await authenticator.isAuthenticated(request, {
        successRedirect: `/${lang}/tests`,
      });

      return true;
    },
    { key: () => params.lang }
  );
}

export default function Login() {
  const data = useRouteData<typeof routeData>();
  const [t] = useI18n();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  return (
    <Show when={data()}>
      <Title>{t("login")}</Title>
      <div class="flex flex-col gap-5 my-10 w-72">
        <Input
          type="email"
          name="email"
          label="Email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          type="password"
          name="password"
          label={t("password")}
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button
          onClick={() =>
            authClient
              .login("credentials", {
                input: {
                  email: email(),
                  password: password(),
                },
              })
              .then(() => refetchRouteData())
              .catch(() => setError("Wrong email or password"))
          }
          class="button place-self-center"
        >
          {t("login")}
        </button>
        {/* <button type="submit" class="button place-self-center">
            {t("login")}
          </button> */}
        <Show when={error()}>
          <p class="text-red-500">{error()}</p>
        </Show>
        <hr />
        <button
          onClick={() =>
            authClient.login("google", {
              successRedirect: "my",
              failureRedirect: ".",
            })
          }
          class="ghost-button justify-center"
        >
          {t("login-with", { provider: "Google" })}
        </button>
      </div>
    </Show>
  );
}
