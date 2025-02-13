import * as Sentry from "@sentry/aws-serverless";

// TODO: Add more configurationg for Sentry to get more detailed error

import { getDbPool } from '../db/dbClient';
import { Handler } from "aws-lambda";

export const handler: Handler = Sentry.wrapHandler(async (_event) => {

    try {
  
      const pool = await getDbPool();
  
      const result = await pool.query("SELECT * FROM tasks");
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