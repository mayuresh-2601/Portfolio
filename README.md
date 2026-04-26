# 🌐 Full Stack Portfolio Web Application

A complete **Full Stack Portfolio Web Application** built using **React, Tailwind CSS, Node.js, Express.js, and MySQL**.

This project demonstrates a real-world developer portfolio system with dynamic project management, skill management, admin authentication, file uploads, and database integration. It showcases full-stack development skills including frontend UI design, backend API development, authentication, and secure database handling.

---

## 🚀 Live Demo

Frontend:
https://mayuresh-2601.github.io/Portfolio

GitHub Repository:
https://github.com/mayuresh-2601/Portfolio

---

## 📌 Project Overview

This application represents a modern developer portfolio where users can:

• View developer profile
• Explore skills and projects
• Submit contact messages
• Access admin login
• Manage projects and skills
• Upload project images
• Store data in MySQL database

The project is designed as a **portfolio-ready full-stack system** suitable for:

• Internship roles
• Junior Developer roles
• Entry-Level Full Stack Developer positions
• Full Stack Developer portfolio showcase

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](/public/Home.png)
---

### 👤 About Page

![About Page](/public/About.png)
---

### 🧠 Contact Page

![About Page](/public/Contact.png)

---


### 🔐 Admin Login

![About Page](/public/Login.png)

---

### 📊 Admin Dashboard

![About Page](/public/Admin.png)

---

## 🛠️ Technologies Used

### Frontend

• React
• React Router
• Tailwind CSS
• Axios
• Responsive Design
• Modern UI Components

### Backend

• Node.js
• Express.js
• REST API
• JWT Authentication
• Middleware
• Multer File Upload

### Database

• MySQL
• SQL Queries
• Database Integration

### Tools

• Git
• GitHub
• VS Code
• Nodemon
• Postman

---

## 🎯 Key Features

### User Features

• Responsive portfolio website
• Dynamic projects display
• Dynamic skills display
• Contact form submission
• Modern UI design

### Admin Features

• Admin login authentication
• Add new projects
• Delete projects
• Add skills
• Delete skills
• Upload project images
• Secure API endpoints

### System Features

• REST API architecture
• JWT authentication
• Protected routes
• File upload system
• Environment configuration
• Error handling middleware
• Database connection pooling

---

## 📂 Project Structure

Portfolio/

frontend/

src/

components/

Navbar.jsx
Home.jsx
About.jsx
Skills.jsx
Projects.jsx
Contact.jsx
AdminLogin.jsx
AdminDashboard.jsx
ProtectedRoute.jsx
Footer.jsx

App.jsx
main.jsx

backend/

config/

db.js

controllers/

authController.js
projectController.js
skillController.js

middleware/

authMiddleware.js
uploadMiddleware.js
errorMiddleware.js

routes/

authRoutes.js
projectRoutes.js
skillRoutes.js

models/

userModel.js
projectModel.js
skillModel.js

server.js
package.json
.env

---

## ⚙️ Installation & Setup

### Step 1 — Clone Repository

git clone https://github.com/mayuresh-2601/Portfolio.git

---

### Step 2 — Navigate to Project

cd Portfolio

---

### Step 3 — Install Frontend Dependencies

cd frontend
npm install

---

### Step 4 — Install Backend Dependencies

cd backend
npm install

---

### Step 5 — Create Environment File

Create `.env` file inside backend:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db

JWT_SECRET=your_secret_key

---

### Step 6 — Import Database

Open:

http://localhost/phpmyadmin

Create database:

portfolio_db

Import:

portfolio_db.sql

---

### Step 7 — Run Backend Server

npm run dev

Server will run on:

http://localhost:5000

---

### Step 8 — Run Frontend

cd frontend

npm run dev

Frontend will run on:

http://localhost:5173

---

## 🔌 API Endpoints

### Authentication

POST /api/auth/login

---

### Projects

GET /api/projects
POST /api/projects
DELETE /api/projects/:id

---

### Skills

GET /api/skills
POST /api/skills
DELETE /api/skills/:id

---

## 🔐 Security Features

• Password hashing using bcrypt
• JWT authentication
• Protected admin routes
• Environment variables
• File upload validation
• SQL prepared statements

---

## 📊 Core Functionalities

### Project Management

• Add new projects
• Upload project images
• Store project data
• Retrieve project information
• Delete projects

### Skill Management

• Add new skills
• Display skills dynamically
• Delete skills

### Authentication

• Admin login verification
• Token-based security
• Protected routes

---

## 📈 What This Project Demonstrates

• Full Stack Web Development
• React Application Development
• REST API Development
• Backend Architecture
• Database Integration
• Authentication System
• File Upload Handling
• Git Version Control
• Debugging and Problem Solving

---

## 🔮 Future Improvements

• Edit project feature
• User registration system
• Contact message dashboard
• Dark mode toggle
• Email notification system
• Role-based authentication
• Cloud deployment

---

## 👨‍💻 Author

Mayuresh Kasar
Full Stack Web Developer

GitHub:
https://github.com/mayuresh-2601

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub.
