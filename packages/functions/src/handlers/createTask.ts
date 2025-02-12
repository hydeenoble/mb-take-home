import { APIGatewayProxyHandler } from 'aws-lambda';
import { query } from '../db/dbClient';
import { Task } from '../types/task';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const task: Task = JSON.parse(event.body || '');
    const { description } = task;

    const result = await query(
      'INSERT INTO tasks (title, description, completed) VALUES ($1) RETURNING *',
      [description]
    );

    return {
      statusCode: 201,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create task' }),
    };
  }
};