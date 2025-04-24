require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cubeRoutes = require('./routes/cube');
const authRoutes = require('./routes/auth'); 
const errorHandler = require('./errorMiddleware');

const app = express();

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
    next();
});
app.use(express.json());
app.use('/api/cubes', cubeRoutes);
app.use('/api/cubes/auth', authRoutes); 
app.use(errorHandler);

connectDB()
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => console.log('Server is listening.'));
    })
    .catch(() => {
        console.log('MongoDB couldn\'t connect');
    });
