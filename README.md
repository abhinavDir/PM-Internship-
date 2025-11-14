📘 PM Internship Portal

A full-stack Internship Management Platform built using React.js (frontend) and Node.js + Express (backend).
This system helps students explore internships, apply online, and track application progress with a smooth and responsive experience.

🚀 Features
⭐ Frontend (React.js)

Responsive and modern UI

Internship listing and search

Internship details page

Application form with validation

Login & Register system (JWT Auth)

Student dashboard

API integration using Axios

⭐ Backend (Node.js + Express)

RESTful APIs for internships

User authentication (JWT based)

Application submission API

MongoDB database integration (Mongoose)

Secure routing + proper error handling

Folder-structured backend

🏗 Tech Stack

Frontend: React.js, Axios, React Router
Backend: Node.js, Express
Database: MongoDB (Mongoose)
Authentication: JWT
Styling: CSS / TailwindCSS

📂 Project Structure
project-root/
│── backend/          # Node.js + Express API
│── internship/       # React.js Frontend
│── README.md
│── package.json

▶️ How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

⚙️ Backend Setup
cd backend
npm install
npm start


Backend runs on:

http://localhost:5000


You can create a .env file:

PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_key

🎨 Frontend Setup
cd ../internship
npm install
npm start


Frontend runs on:

http://localhost:3000
