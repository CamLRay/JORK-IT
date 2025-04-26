// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `jork-it_${name}`);

export const exercises = createTable(
  "exercise",
  (d) => ({
    exercise_id: d.uuid().default(sql`gen_random_uuid()`).primaryKey(),
    name: d.varchar({ length: 256 }),
    tags: d.varchar().array().notNull().default(sql`ARRAY[]::text[]`),
    description: d.varchar(),
    embed: d.varchar(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

