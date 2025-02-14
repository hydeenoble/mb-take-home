import * as Sentry from "@sentry/aws-serverless";

// TODO: Add more configurationg for Sentry to get more detailed error

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