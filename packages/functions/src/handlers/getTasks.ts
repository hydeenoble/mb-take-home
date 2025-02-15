import * as Sentry from "@sentry/aws-serverless";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan({
  name: "My First Transaction",
}, () => {
  // the code executing inside the transaction will be wrapped in a span and profiled
});

// Calls to stopProfiling are optional - if you don't stop the profiler, it will keep profiling
// your application until the process exits or stopProfiling is called.
Sentry.profiler.stopProfiler();
// Place any other require/import statements here
import { db } from '../db/dbClient';
import { Handler } from "aws-lambda";
import { tasks } from "../../../core/src/migrations/tasks";


export const handler: Handler = Sentry.wrapHandler(async (_event) => {

    try {
      const result = await db.select().from(tasks).execute();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.log("Database connection failed:", error);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ error: 'Failed to fetch tasks' }),
      };
    }
  }
);