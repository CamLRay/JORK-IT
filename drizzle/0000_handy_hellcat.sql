CREATE TABLE "jork-it_exercise" (
	"exercise_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"tags" varchar[] DEFAULT ARRAY[]::text[] NOT NULL,
	"description" varchar,
	"embed" varchar,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "jork-it_exercise" USING btree ("name");