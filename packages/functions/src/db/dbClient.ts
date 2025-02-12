// import { Pool } from 'pg';

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: parseInt(process.env.DB_PORT || '5432'),
// });

// // console.log("HOST: ", database.host);

// // await pool.connect();

// export const query = (text: string, params: any[]) => pool.query(text, params);


import { Pool } from "pg";

// Lazy initialization of the database connection pool
let dbPool: Pool | null = null;

async function initializeDatabase(pool: Pool) {
  try {
    // Create the "tasks" table if it doesn't already exist
    await pool.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized and table created (if not exists).");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw new Error("Failed to initialize database");
  }
}

export async function getDbPool() {
  if (!dbPool) {
    dbPool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432", 10),
    });

    await initializeDatabase(dbPool);
  }

  return dbPool;
}