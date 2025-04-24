const express = require('express');
const port = process.env.PORT || 5000;
const cubes = require('./routes/cubes');

const app = express();

// Middleware to parse incoming JSON requests and populate req.body
app.use(express.json());

// This means any route inside cubes.js will be prefixed with /api/cubes
app.use('/api/cubes', cubes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));