import request from 'supertest';
import app from '../app';
import path from 'path';
import fs from 'fs';
import { AppDataSource } from '../config/database';
import { seedAccessibilityIssues } from '../seeders/seed.accessibilityIssues';

beforeAll(async () => {
  // Initialize the database and seed it
  await AppDataSource.initialize();
  await seedAccessibilityIssues();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Accessibility API', () => {
  it('should return a compliance score, issues, and openAI recommendations when a valid HTML file is uploaded', async () => {
    //Test HTML file is available at test/fixtures/faulty.html
    const testFilePath = path.join(__dirname, 'fixtures', 'faulty.html');
    console.log('Test file exists:', fs.existsSync(testFilePath));

    const response = await request(app)
      .post('/api/accessibility/analyze')
      .attach('file', testFilePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('complianceScore');
    expect(response.body).toHaveProperty('issues');
    expect(response.body).toHaveProperty('openAI');
  });

  it('should return an error when no file is uploaded', async () => {
    const response = await request(app).post('/api/accessibility/analyze');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'No file uploaded. Please upload an HTML file.');
  });
});
