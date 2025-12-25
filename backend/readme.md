# 📚 Library Management Backend API

A RESTful backend API built with **Node.js**, **Express**, **Sequelize ORM**, and **SQLite**.  
It supports **JWT authentication**, **password hashing**, **file uploads**, and full **CRUD operations** for customers, books, authors, and loans.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite3
- JWT (Authentication)
- bcrypt (Password hashing)
- Multer (File uploads)
- dotenv (Environment variables)
- CORS
- Nodemon
- ES6 Modules

---

## 📁 Project Structure

backend/
│
├── .env
├── server.js
├── db.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
│
├── models/
│ ├── Customer.js
│ ├── Book.js
│ ├── Author.js
│ ├── Loans.js
│ └── Associations.js
│
├── routes/
│ ├── customer.js
│ ├── book.js
│ ├── author.js
│ └── loans.js
│
├── helpers/
│ ├── authMiddleware.js
│ └── multer.js
│
├── public/
│ └── uploads/

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:
PORT=5000
JWT_SECRET=yourSecretKey

---

## 📦 Installation

```bash
npm install

▶️ Run the Server

Development mode:
npm run dev
Production:
npm start
server runs at:
http://localhost:5000
```

---

🔐 Authentication

JWT-based authentication is used for protected routes.

Register
POST /api/customers/register
Login
POST /api/customers/login
Response
{
"token": "JWT_TOKEN_HERE"
}
Authorization Header
Authorization: Bearer <TOKEN>

📚 API Endpoints
👤 Customers
Method Endpoint Description
POST /api/customers/register Register customer
POST /api/customers/login Login
GET /api/customers Get all customers
GET /api/customers/:id Get one
PUT /api/customers/:id Update
DELETE /api/customers/:id Delete

✍️ Authors
Method Endpoint Description
POST /api/authors Create author
GET /api/authors Get all
PUT /api/authors/:id Update
DELETE /api/authors/:id Delete
📖 Books
Method Endpoint Description
POST /api/books Create book (with image)
GET /api/books Get all
GET /api/books/:id Get one
PUT /api/books/:id Update
DELETE /api/books/:id Delete

📌 Image Upload

Use multipart/form-data

Field name: image

🔄 Loans
Method Endpoint Description
POST /api/loans Create loan
GET /api/loans Get all loans
DELETE /api/loans/:id Delete loan
🗄️ Database

SQLite database auto-created on server start

Sequelize sync enabled

Relationships:

Customer ↔ Loans

Book ↔ Loans

Author ↔ Books

🛡️ Security

Passwords hashed using bcrypt

JWT token expiration

Protected routes via middleware

.env excluded from GitHub

🧪 Testing

Use Postman or Thunder Client:

Login first

Copy token

Add Authorization header

Test protected routes

📌 Future Improvements

Role-based authorization (Admin/User)

Pagination & filtering

Swagger API documentation

Book availability tracking

Frontend integration

👨‍💻 Author
Matan Yehuda Malka

Git
Matanmalka1

Email:
matan1391@gmail.com

Built for learning and practice using modern backend technologies.
