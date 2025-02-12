// import { query } from '../db/dbClient';
import { Handler } from "aws-lambda";

export const handler: Handler = async (_event) => {

    return {
        statusCode: 200,
        body: `This is a task in the getTasks handler file ${process.env.APP_NAME}`
      };

//   try {
//     const result = await query('SELECT * FROM tasks', []);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(result.rows),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Failed to fetch tasks' }),
//     };
//   }
};
