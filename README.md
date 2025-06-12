#  Course Enrollment System

This is a full-stack web application that allows students to register and enroll in courses, while admins and instructors can manage courses. It is built using:

- **Frontend**: React + Tailwind CSS
- **Backend**: Ruby on Rails 8 (API mode) with MySQL
- **Authentication**: Devise Token Auth (JWT-based)

---

##  Features

###  Student
- Login / Register
- View available courses
- Enroll and Unenroll from courses
- View enrolled courses

###  Instructor
- Login/Registration with secret code
- Can view Instructor Dashboard (optional features)

###  Admin
- Login
- Can add or delete courses
- Can view all courses and enrolled student counts

---

##  Technologies Used

- **React** (Frontend)
- **Tailwind CSS** (Styling)
- **Ruby on Rails 8** (Backend API)
- **MySQL** (Database)
- **Devise Token Auth** (JWT-based Authentication)
- **React Router DOM** (Routing)
- **Vite** (React setup)

---

### Setup

Backend:
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s -p 3000
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```
