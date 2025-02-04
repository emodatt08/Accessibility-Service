# Accessibility React App

The **Accessibility React App** is a front-end application built with React, TypeScript, and Tailwind CSS. This application consumes the Accessibility API backend to upload HTML files for analysis and display the results. The project was set up using Vite for fast development and bundling, and it uses React Router for navigation. All tests are run with Vitest.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Routes and Pages](#routes-and-pages)
- [Setup and Installation](#setup-and-installation)
- [Running the App](#running-the-app)
- [Running Tests](#running-tests)

## Features

- **HTML File Upload**: Users can upload an HTML file for accessibility analysis.
- **Results Display**: View the compliance score, list of accessibility issues, and recommendations (including OpenAI enhancements) returned by the backend API.
- **Routing**: Easy navigation between Home, Upload, and Analysis Result pages using React Router.
- **Styling**: Built with Tailwind CSS for a responsive and modern UI.
- **Fast Development**: Powered by Vite for a quick and efficient development experience.
- **Testing**: Uses Vitest for unit and integration tests.

## Tech Stack

- **Framework**: React with TypeScript
- **Bundler/Dev Server**: Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS
- **Testing**: Vitest, @testing-library/react, @testing-library/user-event
- **API Communication**: Fetch API to interact with the Accessibility API backend


## Routes and Pages

- **Home (`/`)**: A welcome page with a link to the upload page.
- **Upload (`/upload`)**: A page where users can select and upload an HTML file.
- **Analysis Result (`/result`)**: Displays the analysis results returned by the backend API, including compliance score, identified issues, and OpenAI enhancements.

## Setup and Installation

**Install deps**:

   ```bash
  npm install
  ```
## Run the App
  ```bash
  npm run dev
  ```

## Run tests
 ```bash
  npm run test
  ```

