import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { schema } from "~/server/db/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
        usePlural: true,
        schema: schema,
    }),
    
    emailAndPassword: {  
      enabled: true
  },
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID!, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
  }, 
  }, 
  plugins: [nextCookies()]
});