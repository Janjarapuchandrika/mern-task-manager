
# MERN Task Manager

## Features
- Create Tasks
- Update Tasks
- Delete Tasks
- Filter by Completed/Pending

## Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js

## Setup Instructions

### Run using Docker
```bash
docker-compose up --build
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Create `.env` inside backend:
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
```

## API Endpoints
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
