const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorMiddleware');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true, 
    legacyHeaders: false, 
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
    next();
})
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

connectDB()
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log('Server is listening.'));
    })
    .catch(() => console.log('MongoDB could not connect.'));