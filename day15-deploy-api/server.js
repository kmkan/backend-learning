require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const cubeRoutes = require('./routes/cubeRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandling');

const app = express();

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100, 
    message: "Too many requests. Please try again later."
});

app.use(limiter);
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
    next();
})
app.use('/api/cubes', cubeRoutes);
app.use('/api/cubes', authRoutes);
app.use(errorHandler);

connectDB()
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log('Server is listening.');
        })
    })
