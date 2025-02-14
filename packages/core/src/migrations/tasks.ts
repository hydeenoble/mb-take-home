import { text, serial, timestamp, pgTable } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});


// CREATE TABLE tasks (
//     id SERIAL PRIMARY KEY,
//     description TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );