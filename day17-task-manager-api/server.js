const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
    next();
})
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use(errorHandler);

connectDB()
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log('Server is listening.'));
    })
    .catch(() => console.log('MongoDB could not connect.'));