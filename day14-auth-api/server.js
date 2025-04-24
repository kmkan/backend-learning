require('dotenv').config();
const express = require('express');
const cubeRoutes = require('./routes/cubeRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
    next();
});
app.use(express.json());
app.use('/api/cubes', cubeRoutes);
app.use('/api/cubes', authRoutes);
app.use(errorHandler);

connectDB()
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => console.log('Server is listening.'));
    })
    .catch(() => {
        console.log('MongoDB couldn\'t connect');
    });
