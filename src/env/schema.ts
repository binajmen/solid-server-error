import { z } from "zod";

export const serverScheme = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string(),
  SITE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export const clientScheme = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development"),
  // VITE_SESSION_SECRET: z.string(),
});
