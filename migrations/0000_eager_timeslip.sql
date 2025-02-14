CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
