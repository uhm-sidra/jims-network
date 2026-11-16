# JIMS Alumni Network (Phase 1 Prototype & Architecture)

An integrated campus networking platform connecting students, alumni, and faculty coordinators of **Jagan Institute of Management Studies (JIMS)**.

---

## 🎯 Phase 1 Goals & Features
This project showcases the **System Design, Architecture, and Core Functional Flows** for Phase 1:
* **Community Feed**: Live campus notices, alumni placement tips, and peer discussions. Interactive post creation, category filtering, likes, and comments.
* **Student & Alumni Directory**: Cross-department directory with real-time name, company, and department search, role filter (Student vs. Alumni), and one-click connection toggling.
* **Campus Internships & Jobs**: Curated job listings with Remote / On-Site filtering, skill tags, stipend information, and one-click *Apply Now* state management.
* **Profile & Campus Credentials**: Academic profile with enrollment info, skill tags, and timeline progress.
* **Decoupled Architecture with Graceful Fallback**:
  * Seamlessly connects to the Express/Node.js REST API on port `5000` when running.
  * Automatically falls back to an interactive local prototype store if the backend/database is offline, guaranteeing 100% demo uptime.

---

## 🛠️ Tech Stack & System Design

* **Frontend**: React 19, Vite, Modern CSS (Responsive CSS Grid & Flexbox)
* **Backend API**: Node.js, Express.js (Modular controllers & REST endpoints)
* **Database & Modeling**: MongoDB, Mongoose schemas (Users, Posts, Internships)
* **Authentication Architecture**: JWT (JSON Web Tokens) with `bcryptjs` password hashing
* **Documentation**: See [SYSTEM_DESIGN_PHASE1.md](file:///c:/Users/DELL/Desktop/Alumini-network/SYSTEM_DESIGN_PHASE1.md) for full architecture diagrams and API specs.

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (Optional for Demo)
```bash
# In project root:
npm start
# Runs backend at http://localhost:5000
```

### 2. Start the Frontend Application
```bash
# Navigate to the frontend directory:
cd front-prototype/jims-network-main
npm run dev
# Vite will open the local development preview (typically http://localhost:5173)
```
