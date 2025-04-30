# 🩺 Doctor Listing App

A full-stack web application built using **Next.js**, **MongoDB**, and **Tailwind CSS** to **add** and **view doctors**. Designed with a clean UI and RESTful API integration.

## 🚀 Features

- Add a doctor with name, specialization, and years of experience.
- View the list of all added doctors.
- Beautiful responsive UI using Tailwind CSS.
- MongoDB Atlas integration via Mongoose.
- API routes (`/api/add-doctor`, `/api/list-doctor`).

---

## 📦 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes, Mongoose
- **Database**: MongoDB Atlas

---

## 🔧 Getting Started

### 1. Clone the Repository

git clone (https://github.com/amanraj464667/doctorprofile.git)
cd doctor-listing-app

2. Install Dependencies

npm install

3. Set Up Environment Variables
   .env
   
5. Create a .env.local file in the root:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/doctors
Replace <username> and <password> with your actual MongoDB Atlas credentials.

4. Run the Development Server

npm run dev
Open http://localhost:3000 in your browser.

