// ensureDatabase.ts
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function ensureDatabaseExists() {
  // Get the connection details from environment variables
  const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
  } = process.env;

  if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
    throw new Error('One or more database environment variables are not set');
  }

  // Connect to the default database 'postgres'
  const client = new Client({
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();

    // Check if the target database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (result.rowCount === 0) {
      console.log(`Database "${DB_NAME}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } catch (error) {
    console.error("Error ensuring database exists:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

ensureDatabaseExists();
