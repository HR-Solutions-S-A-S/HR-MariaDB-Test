# Creating the README.md file as requested
readme_content = """
# Booking Project

This project is a full-stack application built using Node.js for the backend and React for the frontend. It is designed for managing booking-related tasks, featuring user authentication, user posts, and a relationship system where users can follow each other.

## Table of Contents
- [Project Overview](#project-overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Project Overview

The Booking Project is split into two main parts:
1. **Frontend (Client)**: Built with React, it includes user interfaces for authentication, viewing posts, and interacting with other users.
2. **Backend (API)**: Built with Node.js and Express, it provides RESTful APIs for user authentication, post management, and handling user relationships.

## Frontend

The frontend is located in the `client` directory. It is a React application that uses several popular libraries for styling, routing, and state management.

### Key Features:
- **React** for building the user interface.
- **Material UI** for UI components.
- **React Query** for data fetching and caching.
- **React Router** for client-side routing.
- **Axios** for making HTTP requests to the backend.
- **Sass** for styling.

### Technologies Used:
- React: `^18.0.0`
- Material UI: `^5.10.10`
- React Query: `^4.13.0`
- React Router: `^6.4.2`
- Axios: `^1.1.3`
- Sass: `^1.55.0`

### Scripts:
- `npm start`: Starts the development server.
- `npm run build`: Builds the production-ready version of the app.
- `npm test`: Runs the tests for the project.
- `npm run eject`: Ejects the configuration for React Scripts.

## Backend

The backend is located in the `api` directory and is built with Node.js, Express, and MariaDB. It handles user authentication, post creation and retrieval, and relationship management between users.

### Key Features:
- **User Authentication** using JWT tokens.
- **CRUD Operations** for posts and user data.
- **Relationship Management** to allow users to follow each other.
- **Token-based Security** using JWT.

### Technologies Used:
- Node.js
- Express: `^4.18.2`
- MariaDB: `^3.4.0`
- JWT (JSON Web Tokens) for authentication: `^9.0.2`
- Sequelize ORM: `^6.37.5`
- bcryptjs for password hashing: `^2.4.3`
- Multer for handling file uploads: `^1.4.5-lts.1`
- Cors for cross-origin resource sharing: `^2.8.5`
- Dotenv for environment variables: `^16.4.7`

### Scripts:
- `npm start`: Starts the API server using `nodemon`.

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/Jonathan-Prime/Project-MEAN
cd Project-MEAN
