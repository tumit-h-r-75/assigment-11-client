# 🌟 Volunteer Hub – A Volunteer Management Platform

### 🔗 Live Website: [https://volunteer-hub-app.web.app](https://volunteer-hub-client.web.app)  
### 📦 Client Repository: [GitHub - Client](https://github.com/your-username/volunteer-hub-client)  
### 🛠 Server Repository: [GitHub - Server](https://github.com/your-username/volunteer-hub-server)

---

## 📚 Project Overview

**Volunteer Hub** is a full-stack volunteer management web application that allows users to create volunteer need posts, manage them, and volunteer for others' posts. The system ensures user authentication, private route protection, secure token-based (JWT) communication, and seamless CRUD operations with a responsive and eye-pleasing UI.

---

## 🎯 Key Features

- 🔐 **Authentication**
  - Email/password login & register
  - Google login support
  - Protected routes with JWT
  - Error handling with toast/alerts

- 📝 **Volunteer Post Management**
  - Create, read, update, delete (CRUD)
  - View All posts, My Posts, My Requests
  - Real-time volunteer count decrement
  - Request modal with volunteer suggestion

- 🗂️ **Pages**
  - Home page with slider & featured posts
  - Add Volunteer Post (private)
  - Volunteer Post Details (private)
  - All Posts with Search
  - Manage My Posts (private)
  - 404 Not Found page
  - Dynamic Page Titles

- 🌗 **User Interface**
  - Fully responsive layout (Mobile-Tablet-Desktop)
  - Dark / Light Theme toggle
  - Beautiful & accessible layout with Flowbite + TailwindCSS

- 🚀 **Deployment & Security**
  - Firebase Hosting (Client)
  - Vercel Hosting (Server)
  - .env for Firebase & MongoDB credentials
  - CORS handled, no reload issues

---

## 🧪 Extra Features (Challenge & Optional)

- 🔄 Layout Toggle (Card/Table view)
- 🚫 Disable volunteer when count = 0
- 🌀 Framer Motion Animations
- 📦 Loading Spinners with Lottie
- 🔍 Search functionality (Post Title)
- 🎨 Additional UI enhancements for recruiters

---

## ⚙️ Technologies & Libraries Used

### 🔧 Frontend

- React 19
- React Router v7
- Firebase Auth
- Axios
- TailwindCSS + DaisyUI + Flowbite
- Framer Motion
- React Toastify
- SweetAlert2
- React Icons
- React DatePicker
- React Hook Form
- React Helmet
- SwiperJS (Slider)
- Lottie React (Animations)
- JWT Client Storage

### 🔧 Backend

- Node.js
- Express.js
- MongoDB (CRUD + $inc operator)
- dotenv
- CORS
- JSON Web Token (JWT)
- Vercel Deployment

---

## ✅ Functional Pages

| Page                      | Route                     | Access       |
|---------------------------|---------------------------|--------------|
| Home                      | `/`                       | Public       |
| Login                     | `/login`                  | Public       |
| Register                  | `/register`               | Public       |
| Add Post                  | `/add-post`               | Private 🔒   |
| All Posts                 | `/all-posts`              | Public       |
| Post Details              | `/post/:id`               | Private 🔒   |
| Be a Volunteer            | `/be-a-volunteer`         | Private 🔒   |
| Manage My Posts           | `/manage-posts`           | Private 🔒   |
| Update Post               | `/update/:id`             | Private 🔒   |
| My Volunteer Requests     | `/my-requests`            | Private 🔒   |
| 404 Page                  | `*`                       | Public       |

---

## 🔐 Authentication & JWT Workflow

- Firebase Auth used for login/register.
- After login, token is generated from server and stored in localStorage.
- Token is sent with every protected API call.
- Private routes are protected using JWT verification.

---

## 🔥 How to Run Locally

### 🖥 Client Side
```bash
git clone https://github.com/your-username/volunteer-hub-client.git
cd volunteer-hub-client
npm install
npm run dev
