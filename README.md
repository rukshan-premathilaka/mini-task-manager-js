# Mini Task Manager

A beginner-friendly full-stack task management application built with React, Node.js, and Express.

This project is being developed as a hands-on learning exercise to understand how a frontend communicates with a backend through REST APIs.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- ESLint

### Backend
- Node.js
- Express.js
- REST API
- dotenv for environment configuration

### Development Tools
- WebStorm
- Git and GitHub
- npm

## Current Features

- Express backend server
- Health-check API endpoint
- Separate frontend and backend applications
- Environment-based backend configuration

## Project Structure

```text
mini-task-manager-js/
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following tools before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd mini-task-manager-js
```

Replace the placeholder with your GitHub repository URL.

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```dotenv
PORT=3000
```

Start the backend:

```bash
npm run dev
```

The backend runs at `http://localhost:3000`.

Test the health endpoint:

`http://localhost:3000/api/health`

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file based on `frontend/.env.example`:

```dotenv
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Environment Variables

| Variable | Application | Purpose |
|---|---|---|
| `PORT` | Backend | Port used by the Express server |
| `VITE_API_URL` | Frontend | Base URL of the backend API |

Local `.env` files are excluded from Git. Example environment files are included so other developers can configure their own environments.

## Planned Features

- Create tasks
- Retrieve and display tasks
- Mark tasks as completed
- Delete tasks
- Connect React to the Express REST API
- Add persistent database storage
- Add automated tests
- Improve documentation

## Learning Objectives

This project explores:

- Full-stack JavaScript development
- React frontend development
- Node.js and Express fundamentals
- REST API design and HTTP methods
- Frontend-backend communication using JSON
- Environment configuration
- Git version control
- Database integration and testing

## License

A license has not yet been selected for this project.
