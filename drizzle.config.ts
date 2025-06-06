import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["jork-it_*"],
} satisfies Config;
