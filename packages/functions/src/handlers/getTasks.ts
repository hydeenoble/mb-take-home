import * as Sentry from "@sentry/aws-serverless";

import { query } from '../db/dbClient';
import { Handler } from "aws-lambda";

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

export const handler: Handler = Sentry.wrapHandler(async (_event) => {

  // throw new Error("This should show up in Sentry!")

    try {
    
      const result = await query("SELECT * FROM tasks", []);
      
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Or your specific origin
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET" // Add other methods as needed
        },
        body: JSON.stringify(result.rows),
      };
    } catch (error) {
      console.log("Database connection failed:", error);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Or your specific origin
          "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET" // Add other methods as needed
        },
        body: JSON.stringify({ error: 'Failed to fetch tasks' }),
      };
    }
  }
);

// export const handler: Handler = 