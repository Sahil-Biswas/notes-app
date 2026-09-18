# Notes App — MERN CRUD Lab

**Student Name:** _Sahil Biswas_
**Student Roll No:** _2026201059_
**GitHub Repository:** _[Paste your repo link here]_

A full-stack CRUD notes application built with MongoDB, Express, React (Vite), and Node.js.

## Tech Stack
- **Frontend:** React (Vite) + Axios
- **Backend:** Node.js + Express + Mongoose
- **Database:** MongoDB (local instance, `notes_db`)

## Project Structure
```
notes-app/
|-- server/   # Express + Mongoose REST API
\-- client/   # Vite + React frontend
```

## Prerequisites
- Node.js (v18+) and npm installed
- MongoDB running locally on the default port (`mongodb://localhost:27017`)

## Setup & Run Instructions

### 1. Start MongoDB
Make sure a local MongoDB daemon is running (e.g. `mongod` in a separate terminal,
or via your OS's MongoDB service).

### 2. Backend (Server)
```bash
cd server
npm install
npm start
```
The API will start on **http://localhost:5000**, connecting to `mongodb://localhost:27017/notes_db`.

### 3. Frontend (Client)
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
The React app will start on **http://localhost:5173**.

### 4. Use the App
Open http://localhost:5173 in your browser. You can:
- Add a note (title + content)
- View all notes, newest first
- Delete a note (updates instantly, no refresh needed)

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| POST   | `/api/notes`         | Create a new note (returns 201)       |
| GET    | `/api/notes`         | Get all notes, newest first           |
| DELETE | `/api/notes/:id`     | Delete a note by ID (200 or 404)      |

## Screenshots
See `screenshots/ui-preview.png` and `screenshots/delete-action.png`.

## Notes
- CORS is explicitly enabled on the server to allow requests from the Vite dev
  server at `http://localhost:5173`.
- Database connection errors are caught and logged clearly via `.catch()` in
  `server/config/db.js`.
- `node_modules/` and `dist/` are excluded from this submission; run `npm install`
  in both `server/` and `client/` to regenerate dependencies.
