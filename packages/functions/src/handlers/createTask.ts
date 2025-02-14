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

import { Handler } from 'aws-lambda';
import { query } from '../db/dbClient';
import { Task } from '../types/task';

export const handler: Handler = Sentry.wrapHandler(async (event) => {
  try {
    const task: Task = JSON.parse(event.body || '');
    const { description } = task;

    const result = await query(
      'INSERT INTO tasks (description) VALUES ($1) RETURNING *',[description]
    );

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*", // Or your specific origin
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET" // Add other methods as needed
      },
      body: JSON.stringify(result.rows[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET" // Add other methods as needed
      },
      body: JSON.stringify({ error: 'Failed to create task' }),
    };
  }
});