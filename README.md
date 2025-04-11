# 🎓 Student Job Tracker – MERN Stack App
![image](https://github.com/user-attachments/assets/ab4f9e61-97f9-4c0a-a8b8-530ad3343bec)

![image](https://github.com/user-attachments/assets/d701aedf-9bca-4d35-a9e9-13174b047c5d)


A full-stack web application to help students track their job applications efficiently. This project was developed as part of the **Fullstack Developer TA Intern Assignment** for **Cuvette**.

---

## 🚀 Live Links

- **Frontend (Vercel):** [Live App](https://job-tracker-git-main-shanakasps-projects.vercel.app/)
- **Backend (Render):** [Live API](https://jobtracker-0ued.onrender.com)
- **Video Walkthrough:** [Watch on Google Drive/YouTube](https://drive.google.com/drive/folders/1pjf1A9IAtwpjWs9W_I3ltarmH5NnRTZY?usp=sharing)

---

## 🛠️ Tech Stack

### 🔧 Frontend
- React (with Hooks)
- Axios
- Tailwind CSS / Bootstrap (if used)
- Recharts (for charts)

### 🔧 Backend
- Node.js
- Express.js
- MongoDB Atlas (Database)
- Mongoose

### 🧪 Deployment
- **Frontend:** Vercel  
- **Backend:** Render / Railway  
- **Database:** MongoDB Atlas

---

## 📦 Features

- **Add Job Application**
  - Fields: `Company`, `Role`, `Status (Applied / Interview / Offer / Rejected)`, `Date`, `Link`
  
- **List All Applications**
  - Responsive grid layout
  - Clean UI using Tailwind or Bootstrap

- **Filter Jobs**
  - Filter by `Status` or `Date`

- **Update Status**
  - Change job application status anytime

- **Delete Application**
  - Remove unwanted entries

- **Job Status Chart**
  - Bar chart displaying frequency of each status (Recharts)

---

## 📁 Folder Structure

```bash
📦 student-job-tracker
├── client/                # Frontend (React)
│   ├── components/        # Reusable components
│   ├── pages/             # App pages
│   ├── App.jsx
│   └── main.jsx
├── server/                # Backend (Node + Express)
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── server.js
│   └── .env
