# 🧩 Rubik's Cube API — Built with Node.js

## 📖 What I Built

I built a simple web server using **Node.js** that handles `GET` requests and serves basic API responses. This project was created as part of my learning journey following **Traversy Media's Node.js crash course**, after which I extended the project into my own **Rubik's Cube API**.

Node.js is a JavaScript **runtime environment** that allows you to write backend/server-side logic using JavaScript. I learned how to:

- Use the built-in `http` module to create a server
- Use `fs` and `path` modules to extend file-serving functionality
- Respond with different **status codes** and **content types**
- Define dynamic endpoints and serve **JSON data**
- Set up `npm` scripts for easy development workflows
- Understand the purpose of `dependencies` vs `devDependencies` in `package.json`
- Avoid committing `node_modules` and use `.gitignore` instead

---

## ▶️ How to Run It

### Prerequisites
- Node.js installed on your machine
- `npm` (comes with Node.js)

### Install Dependencies
```bash
npm install
```

### Run Server
```bash
node server.js
```

### Run with `npm` scripts
```bash
npm run start   # Starts the server normally
npm run dev     # Starts the server using nodemon for live reloading
```

> The server runs on `http://localhost:5000` by default, or whatever port is specified in your environment variables.

---

## 🌐 Endpoints & Sample Responses

### `GET /`

**Response:**
```html
<h1>Welcome to the Rubik's Cube API!
```

---

### `GET /cubes`

**Response:**
```json
[
  {
    "name": "Weilong WRM",
    "brand": "Moyu",
    "size": 55,
    "stickerless": true,
    "id": 1
  },
  {
    "name": "356 M",
    "brand": "Gan",
    "size": 56,
    "stickerless": false,
    "id": 2
  }
]
```

---

### `GET /anything-else`

**Response:**
```html
<h1>404 PAGE NOT FOUND
```

**Status:** `404 Not Found`

---

## 💬 Final Thoughts

This project helped me gain hands-on experience with Node.js, HTTP servers, and how backend logic flows. I also learned how to work with modules, serve dynamic content, and organize `npm` scripts properly.

Special thanks to Traversy Media for the excellent tutorials that helped me get started. I’m excited to keep expanding this into a more advanced API with routing, middleware, and persistent data in the future.

---