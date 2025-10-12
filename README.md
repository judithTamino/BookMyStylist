# Book My Stylist

Hairdresser booking app.

---

## 🚀 Live API Documentation
📄 [View API Documentation on Postman](https://documenter.getpostman.com/view/9640984/2sB3Heu499)

The API documentation includes detailed information about available endpoints, request/response examples, authentication, and usage guides for both client and admin roles.

---

## 🧩 Features

### 💅 For Clients
- Browse salon services and categories  
- Book appointments at avaiable time slots 
- Cancel upcoming appointments  
- Receive booking confirmations by email  
- Secure authentication (login/signup)

### ✂️ For Admin
- View and manage appointments   
- Define and edit available working hours  
- Mark days off  
- View monthly summaries and analytics  
- Manage services  

### ⚙️ General
- Responsive and modern UI built with React  
- RESTful backend with authentication and validation  
- Role-based access control (Admin & Client)  
- Integrated with MongoDB for scalable data storage  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, TypeScript, TailwindCSS, Formik, Yup |
| **Backend** | Node.js, Express.js, Morgan, bcryptjs, cors, dotenv, joi, nodemailer |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JWT (JSON Web Token) |
| **API Documentation** | Postman |

---

## ⚡ Installation & Setup

### 1. Clone the repository
```bash 
git clone https://github.com/judithTamino/book-my-stylist.git
cd book-my-stylist
```

### 2. Install dependencies
```bash
cd backend
npm install

cd frontend
npm install
```

---


## 🌍 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ENV` development

`PORT` 5500

`MONGODB_ATLAS_URI` your_mongodb_atlas_connection_string
`MONGODB_LOCAL_URI` your_local_mongodb_connection_string

`JWT_SECRET` your_jwt_secret_key

`ADMIN_EMAIL` admin@example.com

`EMAIL_PASSWORD` your_GOOGLE_app_password
* gmail -> Manage your Google Account => App Password

---

## ▶️ Run the Application

### Start the backend server
```bash 
cd backend
npm run dev
```

### 2. Start the frontend
```bash
cd frontend
npm run dev
```

---  

## Authors

- [@JudithTamino](https://www.github.com/judithTamino)


