import { createSolidAuthHandler } from "@solid-auth/core";
import type { AuthUser } from "~/server/auth";
import { authenticator } from "~/server/auth";

const handler = createSolidAuthHandler<AuthUser>(authenticator);

export const POST = handler;
export const GET = handler;
