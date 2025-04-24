# 🧩 Rubik's Cube API — Express.js Edition

## 📖 What I Learned

Today, I learned **Express.js**, starting with Traversy Media's excellent crash course and then applying the concepts by building a new version of my **Rubik’s Cube API** — originally written in plain Node.js.

Express.js is a **web framework for Node.js** that abstracts away the low-level details of server creation, making it much easier to implement routing, CRUD operations, and JSON handling. It allows for modular design with tools like `express.Router()` and significantly reduces boilerplate.

Through this project, I learned how to:
- Create a server using Express
- Set up modular routing using `express.Router()`
- Parse JSON request bodies using middleware
- Handle query parameters and URL parameters
- Implement GET and POST routes for a mini in-memory database of Rubik's cubes

---

## 🚀 How to Run the API

```bash
npm install
node server.js
```
> Runs on `http://localhost:5000` by default

---

## 🌐 Endpoints

### `GET /api/cubes`
Returns all cubes.

#### Optional Query Parameter:
`limit` — return only the first N cubes.
```http
GET /api/cubes?limit=2
```

### `GET /api/cubes/:id`
Returns a single cube by ID.

```http
GET /api/cubes/2
```

**Response:**
```json
{
  "id": 2,
  "brand": "Gan",
  "name": "356 M",
  "stickerless": true
}
```

### `POST /api/cubes`
Add a new cube.

#### Request Body:
```json
{
  "name": "RS3M 2021",
  "brand": "MoYu",
  "size": 56,
  "stickerless": true
}
```

#### Response:
```json
{
  "id": 4,
  "name": "RS3M 2021",
  "brand": "MoYu",
  "size": 56,
  "stickerless": true
}
```

---

## 🧩 Main Server (`server.js`)
```js
const express = require('express');
const port = process.env.PORT || 5000;
const cubes = require('./routes/cubes');

const app = express();

// Middleware to parse incoming JSON requests and populate req.body
app.use(express.json());

// Mount the cubes router at /api/cubes
app.use('/api/cubes', cubes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

---

## 🔁 Cubes Router (`routes/cubes.js`)
```js
const express = require('express');
const router = express.Router();

let cubes = [
  { id: 1, brand: "Moyu", name: "Weilong WRM", stickerless: true },
  { id: 2, brand: "Gan", name: "356 M", stickerless: true },
  { id: 3, brand: "YJ", name: "MGC V2", stickerless: false }
];

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(cubes.slice(0, limit));
  }
  res.status(200).json(cubes);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cube = cubes.find(cube => cube.id === id);
  if (!cube) {
    return res.status(400).json({ msg: `Cube with id ${id} doesn't exist...` });
  }
  res.status(200).json(cube);
});

router.post('/', (req, res) => {
  const { name, brand, size, stickerless } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Please include a name..." });
  } else if (!brand) {
    return res.status(400).json({ msg: "Please include a brand..." });
  } else if (isNaN(size)) {
    return res.status(400).json({ msg: "Please include a valid size..." });
  } else if (typeof stickerless !== 'boolean') {
    return res.status(400).json({ msg: "Please include true or false..." });
  }

  const newCube = {
    id: cubes.length + 1,
    name,
    brand,
    size,
    stickerless
  };

  cubes.push(newCube);
  res.status(201).json(newCube);
});

module.exports = router;
```

---