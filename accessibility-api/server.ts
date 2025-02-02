// src/server.ts
import app from './app';
import { AppDataSource } from './config/database';
import { seedAccessibilityIssues } from './seeders/seed.accessibilityIssues';

// Initialize the database connection.
AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    // Seed the database with known accessibility issues.
    await seedAccessibilityIssues();

    // Start the Express server.
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
