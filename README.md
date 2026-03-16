# Full Stack Engineer Take-Home Assessment Solution MB Teach - Kasun Weerasekara

This project implements the requested to-do task web application from the uploaded assessment: users can create tasks, only the latest 5 active tasks are shown, and clicking **Done** hides completed tasks from the UI. It uses a relational database, a REST backend, a simple SPA frontend.Showing all task from done api. But less than Time for this assignment.

## Tech stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Testing:** Vitest + Testing Library, Jest + Supertest + playwright
- **Containerization:** Docker + Docker Compose

## Architecture

### Database
A PostgreSQL table named `task` is created on backend startup:

- `id` - primary key
- `title` - short task title
- `description` - task details
- `is_completed` - completion state
- `created_at` - creation timestamp
- `completed_at` - completion timestamp

### Backend API
REST endpoints:

- `GET /health` - health check
- `GET /api/tasks` - returns the latest 5 incomplete tasks
- `POST /api/tasks` - creates a new task
- `PATCH /api/tasks/:id/done` - marks a task completed

### Frontend
Single-page React UI with:

- Task creation form
- Recent tasks list
- Done button per task card
- Error and loading states

## Run with Docker

From the project root:

Open the app at:

- Frontend: `http://localhost:4173`
- Backend: `http://localhost:3001/health`

## Run locally without Docker

### 1. Start PostgreSQL
Create a local database called `todo_app` and update the backend env if needed.

### 2. Backend

```bash
cd server
cp .env
npm install
npm start
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

## Tests

### Backend

```bash
cd server
npm install
npm test
```

### Frontend

```bash
cd client
npm install
npm test
```