const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    brand: String,
    name: { type: String, required: true },
    size_mm: {type: Number, min: 40, max: 80 },
    stickerless: Boolean
});

const cubeModel = mongoose.model('Cube', cubeSchema);
module.exports = cubeModel;