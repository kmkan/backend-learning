# Rubik's Cube CRUD API with JWT Authentication

[![Render Status](https://img.shields.io/render/secure-rubiks-cube-crud-api)](https://secure-rubiks-cube-crud-api.onrender.com)

## Overview

This is a fully functional CRUD (Create, Read, Update, Delete) API designed for managing a collection of Rubik's Cubes. It incorporates secure user authentication using JSON Web Tokens (JWT), allowing logged-in users to interact with the cube data stored in a MongoDB Atlas database and deployed on Render.

**Live Demo:** [https://secure-rubiks-cube-crud-api.onrender.com](https://secure-rubiks-cube-crud-api.onrender.com)

## Features

* **User Registration:** Allows new users to create accounts with a username and password. Passwords are securely hashed using `bcrypt`.
* **User Login:** Authenticates existing users by verifying their username and password against the stored hashed credentials. Upon successful login, a JWT access token is issued.
* **JWT Authentication:** Protects all data-manipulating routes (Create, Read, Update, Delete for cubes) by requiring a valid JWT in the `Authorization` header. This ensures that only logged-in users can access and modify the cube data.
* **CRUD Operations for Rubik's Cubes:**
    * **GET /api/cubes:** Retrieves a list of all Rubik's cubes (requires authentication).
    * **POST /api/cubes:** Adds a new Rubik's cube to the database (requires authentication).
    * **GET /api/cubes/:id:** Retrieves a specific Rubik's cube by its ID (requires authentication).
    * **PUT /api/cubes/:id:** Updates an existing Rubik's cube by its ID (requires authentication).
    * **DELETE /api/cubes/:id:** Deletes a specific Rubik's cube by its ID (requires authentication).
* **MongoDB Atlas Integration:** Utilizes MongoDB Atlas as the cloud-based database to store user and cube data.
* **Deployment on Render:** The API is deployed and accessible through Render, a platform for hosting web applications.
* **Basic Security Measures:** Implements `helmet` for setting various HTTP headers to help protect against well-known web vulnerabilities and `express-rate-limit` to prevent brute-force attacks.

## Security in this API

This API incorporates several security measures to protect user data and the integrity of the application:

* **Password Hashing:** User passwords are not stored in plain text. Upon registration, passwords are encrypted using the `bcrypt` library, making it extremely difficult for malicious actors to retrieve the original passwords even if the database is compromised.
* **JSON Web Tokens (JWT):** After successful login, the server issues a JWT to the client. This token acts as a temporary credential that the client includes in the `Authorization` header of subsequent requests to protected routes.
* **Token Verification:** The `authenticateToken` middleware on the server verifies the authenticity and validity of the JWT before allowing access to protected resources. This ensures that only authenticated users with a valid token can perform CRUD operations on the Rubik's cube data.
* **`helmet` Middleware:** This middleware helps secure the application by setting various HTTP headers. For example, it can help prevent XSS attacks, clickjacking, and other common web vulnerabilities.
* **Rate Limiting:** The `express-rate-limit` middleware is used to limit the number of requests an IP address can make within a certain time window. This helps to prevent brute-force attacks on the login endpoint and other potential abuse.

**Note:** While these measures provide a good foundation for security, this is a first iteration. For production applications, consider further security enhancements such as input validation (though basic validation might be present in Mongoose schemas), more robust error handling that doesn't expose sensitive information, and staying up-to-date with security best practices.

## Technologies Used

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* jsonwebtoken (JWT)
* bcrypt
* helmet
* cors
* express-rate-limit
* dotenv
* Render

## Getting Started (for Development or Contribution)

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_REPOSITORY_DIRECTORY>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file** in the root directory and configure your environment variables:
    ```env
    MONGOOSE_URL=YOUR_MONGODB_ATLAS_CONNECTION_STRING
    PORT=5000
    SECRET=YOUR_JWT_SECRET_KEY
    ```
    **Important:** Replace the placeholders with your actual MongoDB connection string and a strong, secret key for JWT.

4.  **Run the development server:**
    ```bash
    npm run start
    # or
    node server.js
    ```
    The server should start running on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

* **POST /api/cubes/register:** Register a new user (request body: `{ name: "username", password: "password" }`).
* **POST /api/cubes/login:** Log in an existing user (request body: `{ name: "username", password: "password" }`). Returns an `accessToken`.
* **GET /api/cubes:** Get all cubes (requires JWT in `Authorization` header: `Bearer <your_access_token>`).
* **POST /api/cubes:** Create a new cube (requires JWT in `Authorization` header and request body with cube data).
* **GET /api/cubes/:id:** Get a specific cube by ID (requires JWT in `Authorization` header).
* **PUT /api/cubes/:id:** Update a specific cube by ID (requires JWT in `Authorization` header and request body with updated cube data).
* **DELETE /api/cubes/:id:** Delete a specific cube by ID (requires JWT in `Authorization` header).
