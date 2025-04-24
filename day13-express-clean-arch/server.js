require('dotenv').config();
const express = require('express');
const router = require('./routes/cubeRoutes');
const connectDB = require('./config/db');

const app = express();
app.use((req, res, next) => {
    console.log(`[${req.method} ${req.url} at ${new Date().toISOString()}]`);
    next();
})
app.use(express.json());
app.use('/api/cubes', router);

connectDB() 
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log('Server is listening.'));
    })