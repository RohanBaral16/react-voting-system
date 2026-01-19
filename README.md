🗳️ Voting System – Frontend & Demo Backend

This repository contains a frontend React application and a demo backend used to simulate backend functionality during development and integration.

The goal of this setup is to allow frontend development, API integration, and flow validation before connecting to the real production backend.

📁 Project Structure
.
├── day-1/
│   └── voting-frontend/        # React app (Vite)
│
├── demo-backend/
│   └── express-server/         # Express.js demo backend with dummy data
│
└── README.md

🚀 day-1/voting-frontend (React + Vite)

This is the frontend application built using:

⚛️ React

⚡ Vite

🌐 Axios (for API calls)

🎨 Tailwind CSS (if enabled)

Purpose

Implement the voting UI

Handle login, voter profile, ballot display

Submit votes (FPTP & PR)

Display results and summaries

Integrate with backend APIs (currently demo-backend)

Setup & Run
cd day-1/voting-frontend
npm install
npm run dev


The app will start at:

http://localhost:5173

Environment Variables (optional)

Create a .env file:

VITE_API_BASE_URL=http://localhost:5000

🧪 demo-backend (Express + Dummy Data)

This is a temporary demo backend built with Express.js to mock real backend behavior.

Purpose

Simulate authentication (session-based)

Provide dummy voter, candidate, and party data

Accept vote submissions

Return mock results

Allow frontend to be developed independently

⚠️ Note: This is not production-ready and will be replaced by the real backend later.

Setup & Run
cd demo-backend
npm install
node index.js


The server will start at:

http://localhost:5000
