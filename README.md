# 💬 Saraha App (Backend)

![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 🧠 Introduction

**Saraha App** is a backend service inspired by the concept of anonymous messaging.  
It allows users to send and receive anonymous messages securely, manage accounts, and interact with a RESTful API that can be integrated with any frontend or mobile client.

---

## 🚀 Features

- 🔐 Authentication using JWT (Access & Refresh tokens)  
- 🧾 User management (signup, login, update, delete)  
- ✉️ Anonymous message system  
- 🕵️ OTP verification for email confirmation  
- ⚙️ Refresh token mechanism  
- 🧱 Clean MVC architecture (controllers, models, routes, middleware) 

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT (Access & Refresh Tokens) |
| **Validation** | express-validator |
| **Security** | bcrypt, dotenv |
| **Logging** | Morgan |
| **Dev Tool** | Nodemon |

---

```## 📁 Project Structure```

Saraha-App/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── app.js
│
├── config/
│   └── db.connection.js
│
├── .env
├── package.json
└── README.md


---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdelmonem-Adel/Saraha-App.git
   cd Saraha-App

   
2. **Install dependencies :**
   ```bash
   npm install



3. **Create a .env file in the project root and add the following :**
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key


4. **Run the server :**
   ```bash
   npm run dev



🔗 API Endpoints : 

  🧍‍♂️ User Routes :
    
| Method     | Endpoint                                | Description                                  |
| ---------- | --------------------------------------- | -------------------------------------------- |
| **POST**   | `/api/users/add`                        | Register a new user                          |
| **GET**    | `/api/users/signin`                     | Log in and get an access token               |
| **POST**   | `/api/users/logout`                     | Log out the user                             |
| **DELETE** | `/api/users/delete/:id`                 | Delete a user by ID                          |
| **PUT**    | `/api/users/update`                     | Update user data (requires AccessToken)      |
| **GET**    | `/api/users/list`                       | Get all users                                |
| **PUT**    | `/api/users/confirm-otp`                | Confirm user OTP                             |
| **POST**   | `/api/users/refresh-token`              | Get a new access token using a refresh token |
| **GET**    | `/api/users/list-user-messages/:userId` | Get all messages for a specific user         |



  💌 Message Routes : 

| Method   | Endpoint                                | Description                         |
| -------- | --------------------------------------- | ----------------------------------- |
| **POST** | `/api/messages/add-message/:receiverId` | Send an anonymous message to a user |
| **GET**  | `/api/messages/get`                     | Retrieve received messages          |


📮 Postman Collection

You can explore and test all API endpoints directly using this Postman collection:
🔗 [View Collection on Postman](https://assignment-3865.postman.co/workspace/Assignment-Workspace~a4ff418a-ffe2-484a-8986-c22a94223df8/collection/40681719-53596fe8-f6cf-49e7-ba80-7630e42c4b43?action=share&source=collection_link&creator=40681719)


**🧩 Example .env File :**
  ```bash
  PORT=5000
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/saraha
  JWT_SECRET=mySuperSecretKey


  
