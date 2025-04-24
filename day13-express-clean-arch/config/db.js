const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log('Connected to MongoDB.');
};

module.exports = connectDB;