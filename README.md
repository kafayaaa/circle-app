<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
  <h1 style="border-bottom: none; margin-bottom: 20px;">Circle</h1>
</div>

<p align="center">
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn%20UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
</p>

---

**Circle** is a modern social media platform built for seamless communication. Users can share thoughts, follow others, and engage in real-time conversations. This project implements a robust full-stack architecture with a focus on performance and scalability.

## ✨ Key Features

- **📝 Thread Conversations**: Post updates, like, and reply to threads in real-time.
- **⚡ Global State**: Predictable state management across the app using **Redux**.
- **🎨 Sleek UI**: Beautiful, accessible, and customizable components built with **Shadcn UI**.
- **🚀 Caching Layer**: Optimized data retrieval and performance with **Redis**.
- **🐳 Containerized**: Fully Dockerized environment for consistent development and production.
- **🛡️ Secure Auth**: JWT-based authentication with PostgreSQL persistence via Prisma.

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS, Shadcn UI.
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **State Management**: Redux
- **DevOps**: Docker & Docker Compose.

## 🚀 Getting Started

Follow these steps to set up Circle on your local machine:

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance
- Docker & Docker Compose
- Redis server
- Cloudinary account (for media)

### Installation & Setup

1. **Clone the repository:**
   
   ```bash
   git clone [https://github.com/kafayaaa/circle-app.git](https://github.com/kafayaaa/circle-app.git)
   cd circle-app

2. **Install dependencies (Root, Frontend, & Backend):**

   ```bash
   npm install
   # or if separated
   cd frontend && npm install
   cd ../backend && npm install

3. **Configure Environment Variables: Create a .env file in the backend directory:**

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/circle"
   JWT_SECRET="your_secret_key"
   REDIS_URL="redis://localhost:6379"
   
4. **Database Migration:**

   ```bash
   npx prisma generate
   npx prisma db push

5. **Run the application:**

   ```bash
   # Start backend
   npm run dev:server
    
   # Start frontend
   npm run dev:client

## 📂 Project Structure

- /frontend - React application and Shadcn UI components.

- /backend - Express API, Prisma schemas, and business logic.


## 📜 License

This project is licensed under the MIT License.

Developed with ❤️ by kafayaaa
