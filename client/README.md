# 🚀 Team Task Manager (MERN Stack)

A full-stack **Task Management Web Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
This app allows users to manage projects, assign tasks, and track progress efficiently.

---

## 🌐 Live Demo

* **Frontend (Vercel):**
  https://team-task-manager-ten-psi.vercel.app

* **Backend (Railway API):**
  https://responsible-simplicity-production.up.railway.app/api

---

## ✨ Features

* 🔐 User Authentication (Login / Signup)
* 📊 Dashboard with task overview
* 📁 Project Management
* ✅ Task Creation & Assignment
* 🧑‍🤝‍🧑 User Management
* 🔄 Real-time updates (API-based)
* 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Deployment

* Frontend: Vercel
* Backend: Railway

---

## 📂 Project Structure

```
team-task-manager/
│
├── client/               # React Frontend
│   ├── src/
│   ├── public/
│   └── vercel.json
│
├── server/               # Backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/Team-Task-Manager.git
cd Team-Task-Manager
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🔗 API Configuration

In frontend (`client/src/services/api.js`):

```
baseURL: "https://responsible-simplicity-production.up.railway.app/api"
```

---

## 🚀 Deployment Steps

### Backend (Railway)

* Connect GitHub repo
* Set root directory: `server`
* Add environment variables
* Deploy

### Frontend (Vercel)

* Import GitHub repo
* Root directory: `client`
* Build command: `npm run build`
* Output directory: `dist`

---

## ⚠️ Important Notes

* Ensure backend is running before frontend requests
* API routes must be declared **before wildcard route (`*`)**
* CORS must allow frontend origin

---

## 📸 Screenshots

* Login Page
* Dashboard
* Task Management UI

---

## 👨‍💻 Author

**Pratham Shah**
GitHub: https://github.com/prathamshahi1

---

## 📄 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you like this project, please ⭐ the repository!
