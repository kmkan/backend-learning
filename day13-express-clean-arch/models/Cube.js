const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    brand: String,
    name: {
        type: String,
        required: true
    },
    size_mm: {
        type: Number,
        min: 40,
        max: 90
    },
    stickerless: Boolean
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;