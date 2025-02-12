import { getDbPool } from '../db/dbClient';
import { Handler } from "aws-lambda";
// import { Task } from '../types/task';

export const handler: Handler = async (_event) => {

  try {

    const pool = await getDbPool();

    const result = await pool.query("SELECT * FROM tasks");
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.log("Database connection failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch tasks' }),
    };
  }
};
