import { DataSource } from 'typeorm';
import { AccessibilityIssue } from '../models/AccessibilityIssue';
import { AccessibilityResult } from '../models/AccessibilityResult';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, 
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  synchronize: false,
  logging: false,
  entities: [AccessibilityIssue, AccessibilityResult],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'], // Migration files
});
