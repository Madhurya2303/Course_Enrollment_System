# 🎓 Course Enrollment System

This is a full-stack web application that allows students to register and enroll in courses, while admins and instructors can manage courses. It is built using:

- **Frontend**: React + Tailwind CSS
- **Backend**: Ruby on Rails 8 (API mode) with MySQL
- **Authentication**: Devise Token Auth (JWT-based)

---

## 🔧 Features

### 👨‍🎓 Student
- Register without password
- Login using email only
- View available courses
- Enroll and Unenroll from courses
- View enrolled courses

### 👩‍🏫 Instructor
- Login/Registration with secret code `@instructor123`
- Can view Instructor Dashboard (optional features)

### 👮‍♂️ Admin
- Login with email: `admin@login.com` & password: `admin123`
- Can add or delete courses
- Can view all courses and enrolled student counts

---

## 🧑‍💻 Technologies Used

- **React** (Frontend)
- **Tailwind CSS** (Styling)
- **Ruby on Rails 8** (Backend API)
- **MySQL** (Database)
- **Devise Token Auth** (JWT-based Authentication)
- **React Router DOM** (Routing)
- **Vite** (React setup)

---

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s -p 3000

cd frontend
npm install
npm run dev
