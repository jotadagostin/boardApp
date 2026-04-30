import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { apiEnv } from "../api-env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  secret: apiEnv.BETTER_AUTH_SECRET,
  baseURL: apiEnv.BETTER_AUTH_URL,
  socialProviders: {
    github: {
      clientId: apiEnv.GITHUB_CLIENT_ID,
      clientSecret: apiEnv.GITHUB_CLIENT_SECRET,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
});

export type AuthSession = typeof auth.$Infer.Session;
