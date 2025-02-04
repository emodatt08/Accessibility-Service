# Accessibility API

The **Accessibility API** is a RESTful service built with Express.js, TypeScript, PostgreSQL, and TypeORM. It accepts HTML file uploads, performs accessibility analysis (such as checking for missing `alt` attributes and skipped heading levels), and enhances the analysis with recommendations using OpenAI's completions. The analysis results (including a compliance score, list of issues, and OpenAI enhancements) are stored in a PostgreSQL database.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes and Endpoints](#routes-and-endpoints)
- [Setup and Installation](#setup-and-installation)
- [Database Migrations and Seeding](#database-migrations-and-seeding)
- [Running the Server](#running-the-server)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [OpenAI Integration](#openai-integration)

## Features

- **HTML File Upload**: Accepts HTML files via a REST endpoint.
- **Accessibility Analysis**: Analyzes the uploaded HTML for:
  - Missing `alt` attributes in `<img>` tags.
  - Skipped or incorrect heading levels.
- **Compliance Score**: Calculates a compliance score based on the number of issues found.
- **OpenAI Enhancements**: Uses OpenAI completions to produce:
  - A "fixed" HTML version with accessibility improvements.
  - Recommendations for further improvements.
- **Persistence**: Stores analysis results in a PostgreSQL database.
- **Migrations and Seeding**: Uses TypeORM migrations to manage database schema changes and seed known accessibility issues.
- **Testing**: Includes Jest test cases to validate endpoints and functionality.

## Tech Stack

- **Backend Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with TypeORM as the ORM
- **File Uploads**: Multer
- **Accessibility Analysis**: Custom rule-based analyzer using Cheerio for HTML parsing
- **External Integration**: OpenAI API for additional recommendations and fixes
- **Testing**: Jest and SuperTest

## Project Structure

accessibility-api/ ├── config/ │ │ └── database.ts // Database connection configuration │ ├── controllers/ │ │ └── accessibility.controller.ts // Controller for handling file uploads and analysis │ ├── models/ │ │ ├── AccessibilityIssue.ts // Entity for known accessibility issues │ │ └── AccessibilityResult.ts // Entity for storing analysis results │ ├── routes/ │ │ └── accessibility.routes.ts // API routes for file upload and analysis │ ├── seeders/ │ │ └── seed.accessibilityIssues.ts // Seeder to populate known issues into the database │ ├── services/ │ │ ├── accessibility.service.ts // Business logic to analyze HTML and store results │ │ └── openai.service.ts // Service to call OpenAI for HTML enhancements │ ├── validations/ │ │ └── fileUpload.validation.ts // Middleware for validating file uploads │ ├── utils/ │ │ └── htmlAnalyzer.ts // Utility to parse and analyze HTML content │ ├── app.ts // Express app configuration │ └── server.ts // Server entry point (database initialization and start) ├── migrations/ // TypeORM migration files ├── .env // Environment variable definitions ├── package.json // Project metadata and scripts ├── tsconfig.json // TypeScript configuration └── README.md // Project documentation (this file)



## Routes and Endpoints

### **POST /api/accessibility/analyze**

- **Description**: Accepts an HTML file upload, analyzes it for accessibility issues, and returns a JSON response with the analysis results.
- **Middleware**:
  - **Multer**: For handling file uploads (files are temporarily stored on disk).
  - **File Upload Validation**: Ensures that a file is provided.
- **Response Format**:

  ```json
  {
    "id": 16,
    "complianceScore": 80,
    "issues": [
      {
        "ruleName": "Missing Alt Attribute",
        "description": "Images should have an alt attribute for accessibility.",
        "suggestedFix": "Add alt attribute describing the image content."
      },
      {
        "ruleName": "Skipped Heading Levels",
        "description": "Headings should be used sequentially to maintain hierarchy.",
        "suggestedFix": "Ensure that heading tags (h1-h6) are used in a sequential order."
      }
    ],
    "createdAt": "2025-02-01T09:00:14.604Z",
    "openAI": {
      "fixedHtml": "<!DOCTYPE html> ... </html>",
      "recommendations": "Added an alt attribute to the image tag ...\nRearranged headings ...\nEnsured all headings are meaningful ..."
    }
  }


## Setup and Installation
- npm install
``` bash
    npm install
```
- You can use docker as well but its not required by running
```bash
 docker-compose up --build
 docker-compose exec backend npm run migration:run
 docker-compose exec backend npm run seed    
```
## Environmental Vars
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=accessibilitydb
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

## Database Migrations:
- npm run migration:run 
- npm run dev

## Run API:
- POST http://localhost:5001/api/accessibility/analyze

## Run Tests:
- npm run test