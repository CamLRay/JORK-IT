import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    CLERK_SECRET_KEY: z.string(),
    // POSTGRES_URL: z.string().url(),
    // POSTGRES_PRISMA_URL: z.string().url(),
    // SUPABASE_URL: z.string().url(),
    // POSTGRES_URL_NON_POOLING: z.string().url(),
    // SUPABASE_JWT_SECRET: z.string(),
    // POSTGRES_USER: z.string(),
    // POSTGRES_PASSWORD: z.string(),
    // POSTGRES_DATABASE: z.string(),
    // SUPABASE_SERVICE_ROLE_KEY: z.string(),
    // POSTGRES_HOST: z.string(),
    // SUPABASE_ANON_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    // NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    // NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    // POSTGRES_URL: process.env.POSTGRES_URL,
    // POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    // SUPABASE_URL: process.env.SUPABASE_URL,
    // POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    // SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    // POSTGRES_USER: process.env.POSTGRES_USER,
    // POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    // POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    // SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    // POSTGRES_HOST: process.env.POSTGRES_HOST,
    // SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    // NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
