
# 💸 Expense Tracker Application - Backend

## 🌟 Overview

The Expense Tracker Backend is a Node.js and Express application that provides a robust API for managing personal expenses. It includes features such as JWT-based authentication, role-based access control (RBAC), and CRUD operations for expense entries. Users can securely sign up, log in, and manage their expenses, while admins have enhanced control over all user data. The application also supports bulk expense uploads via CSV files, advanced filtering, pagination, and sorting for large datasets. MongoDB is used for data storage, and security is enforced with hashed passwords and secure token handling.






## ✨ Features

- **🔐 Expense CRUD Operations**: Create, Read, Update, and Delete expenses.
- **📖 JWT Authentication**: Secure user authentication using JWT tokens.
- **📝 Role-Based Access Control**: Different roles (admin, user) with access restrictions.
- **🥗 CSV Upload**: Bulk upload expenses using CSV files.
- **⭐ Reviews Support**: Add and manage reviews for recipes.
- **⏳ Pagination and Sorting**: Efficient handling of large datasets.
- **🖼️ MongoDB Integration**: Expense data is stored and retrieved from MongoDB.

## 🛠️ Technologies Used

- **🔙 Backend:** Node.js, Express for creating APIs and routing.
- **💾 Database:** MongoDB with Mongoose for schema modeling and data management.
- **🔑 Authentication:** JSON Web Tokens (JWT) for secure user authentication.
- **📧 Email Service:** Nodemailer for sending emails (e.g., password resets).
- **📊 File Handling**: Fast-CSV and multer for handling CSV uploads.
- **🛡 Security**: Helmet for security headers and bcryptjs for password hashing.
- **📈 Caching**: Redis for performance optimization and request rate-limiting.

## 📦 Dependencies

Here’s a list of all the dependencies used in this project along with their versions:

```bash{
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"csv-parser": "^3.0.0",
"dotenv": "^16.4.5",
"express": "^4.21.1",
"express-rate-limit": "^7.4.1",
"fast-csv": "^5.0.2",
"helmet": "^8.0.0",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.7.2",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1",
"nodemailer": "^6.9.15",
"nodemon": "^3.1.7",
"redis": "^4.7.0"
  ```


## 🚀 Setup and Installation

Clone the project

```bash
  git clone https://github.com/MaulikPatel63/EXPENSE_TRACKER_APPLICATION.git
```

Go to the project directory

```bash
  cd EXPENSE_TRACKER_APPLICATION/backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

API will be available at:

```bash
  http://localhost:5000
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`=`<MONGO_URI>`

`PORT`=`<Your_Port`

`JWT_SECRET`=`<Your_Secret>`


## 🌐 Deployment

The backend is deployed on Render.

- **Live Backend URL :** [https://expense-tracker-application-zohe.onrender.com/](https://expense-tracker-application-zohe.[onrender](https://expense-tracker-application-zohe.onrender.com/).com/)


## API Reference

#### Auth Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/auth/signup` | User signup | Public |
| **POST** | `/api/v1/auth/login` | User login and token generation | Public |
| **POST** | `/api/v1/auth/logout` | User logout | Authenticated |
| **GET** | `/api/v1/auth/authCheck` | Check user authentication | Authenticated |

#### Expense Routes

| Method | Endpoint | Description | Access |
| :-------- | :------- | :------------------------- |:------------------------- |
| **POST** | `/api/v1/expense/expense-add` | Add a new expense | Authenticated |
| **GET** | `/api/v1/expense/expense-get` | Get all expenses with filtering and pagination | Authenticated | **Example Request:** - GET /api/expenses/expense-get?category=Food&paymentMethod=cash&startDate=2024-01-01&endDate=2024-12-31&page=1&limit=10 |
| **PUT** | `/api/v1/expense/expense-update` | Update an existing expense by ID | Authenticated |
| **DELETE** | `/api/v1/expense/expense-delete` | Delete an expense by ID | Authenticated |
| **POST** | `/api/v1/expense/expense-upload` | Bulk upload expenses using a CSV file | Authenticated |

## 📚 CSV Upload Example

The CSV file should contain columns: `amount`, `description`, `date`, `category`, `paymentmethod`.


**`Example:`**


```
amount,description,date,category,paymentmethod
100.00,"Groceries",2023-10-20,"Food","cash"
50.00,"Fuel",2023-10-21,"Transport","credit"
```
