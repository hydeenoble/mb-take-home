import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Pick up all our schema files
  schema: ["./packages/core/src/migrations/tasks.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.mightyByteDatabase.host,
    port: Resource.mightyByteDatabase.port,
    user: Resource.mightyByteDatabase.username,
    password: Resource.mightyByteDatabase.password,
    database: Resource.mightyByteDatabase.database,
  },
});