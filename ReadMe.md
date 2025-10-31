# Savings Management System

Customers can register, log in, manage savings, and perform transactions securely, while administrators can verify users and monitor activities.

## What's included

## Backend

Express.js (Node.js): Handles routes, authentication, deposits, withdrawals, balance, etc.

## Database

Postgresql: Stores all user + transaction data

## Frontend:

React.js: Displays dashboard, forms, and alerts

Redux Toolkit: Stores and syncs app data (user info, balance, transactions, etc.)

# Savings Management System Structure

Client Server: http://localhost:5002/api

Swagger Docs: http://localhost:5002/api-docs

Note: JWT required for /savings/_ and /notifications/_

# FrontEnd

```
├── public/          # static files
│   └── index.html   # html template
│
├── src/             # project root
│   ├── assets/      # images, icons, etc.
│   ├── components/  # common components - NavBar, footer, sidebar, etc.
│   ├── layouts/     # layout containers
│   ├── views/       # application views
│   ├── App.js
│   ├── ...
│   ├── index.js
│   ├── routes.js    # routes config
│   └── store.js     # template state example
│
└── package.json
```

# Backend

```
├── src/             # project root
│   ├── Controllers/
│   ├── dtos/
│   ├── middlewares/
│   ├── models/
│   ├── routes
│   ├── services
│   ├── utils
│   ├── server.js    # server config
│
└── package.json
```

### ⚙️ Integration Overview

| Service        | Port    | Role                                 |
| -------------- | ------- | ------------------------------------ |
| Admin Backend  | `:5000` | Verify and manage users              |
| Client Backend | `:5002` | Handle user actions and transactions |
| Database       | `:5432` | Shared PostgreSQL instance           |

```bash
DB_URL=postgres://postgres:postgres@db:5432/credit_jambo


| Table | Purpose | Shared |
|--------|----------|--------|
| `users` | Core user data and verification | ✅ |
| `accounts` | Account balance tracking | ✅ |
| `transactions` | Deposit and withdrawal logs | ✅ |
| `notifications` | System and user alerts | ✅ |
| `devices` | Tracks user login devices | ✅ |
| `admins` | Admin credentials | 🚫 (Admin only) |
| `savings` | Savings balance table | ✅ |
```
