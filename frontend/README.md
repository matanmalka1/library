# 📚 Library Management Frontend

A modern React frontend for the Library Management System built with **React 19**, **Vite**, and **React Router**.

## 🚀 Features

- JWT Authentication (Login/Register)
- Browse Books, Authors, Customers, and Loans
- CRUD Operations (Create, Read, Update, Delete)
- Protected Routes
- Responsive Design
- Clean Component Architecture
- Redux Toolkit for State Management

## 📦 Tech Stack

- React 19
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Notyf (Toast Notifications)
- CSS3

## ⚙️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── api/          # API calls and axios configuration
├── components/   # Reusable UI components
├── store/        # Redux store and slices
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── utils/        # Helper functions and constants
├── App.jsx       # Main app component with routing
└── main.jsx      # App entry point
```

## 🔐 Authentication

1. Register a new account at `/register`
2. Login at `/login`
3. JWT token is stored in localStorage
4. Protected routes require authentication

## 📝 Available Pages

- **Home** (`/`) - Landing page
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Books** (`/books`) - Browse and manage books
- **Authors** (`/authors`) - Browse and manage authors
- **Customers** (`/customers`) - View customers (protected)
- **Loans** (`/loans`) - Manage loans (protected)
- **Not Found** (`*`) - 404 page

## 🎨 Component Guidelines

- **Functional Components** with hooks
- **Clean separation** of concerns
- **Reusable UI** components in `components/common/`
- **Page-specific** components organized by feature

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:5000`:

- `POST /customers/register` - Register
- `POST /customers/login` - Login
- `GET /books` - Get all books
- `GET /authors` - Get all authors
- `GET /customers` - Get all customers (protected)
- `GET /loans` - Get all loans (protected)

## 👨‍💻 Author

**Matan Yehuda Malka**

Built with ❤️ using modern React best practices.
