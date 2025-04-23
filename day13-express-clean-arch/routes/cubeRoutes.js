const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');

router.post('/', async (req, res) => {
    try {
        const { brand, name, size_mm, stickerless } = req.body;
        const newCube = Cube.create({ brand, name, size_mm, stickerless});
        try {
            const cubes = await Cube.find();
            res.status(201).json(cubes);
        } catch (err) {
            console.log('MongoDB Error:', err);
            res.status(500).json({ msg: err.message });
        }    
    } catch (err) {
        console.log('MongoDB Error:', err);
        res.status(500).json({ msg: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const cubes = await Cube.find();
        res.status(200).json(cubes);
    } catch (err) {
        console.log('MongoDB Error:', err);
        res.status(500).json({ msg: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const selectedCube = await Cube.findById(req.params.id);
        if (!selectedCube) {
            return res.status(404).json({ msg: 'Cube not found' });
        }
        res.status(200).json(selectedCube);
    } catch (err) {
        console.log('MongoDB Error:', err);
        res.status(500).json({ msg: err.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const selectedCube = await Cube.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!selectedCube) {
            return res.status(404).json({ msg: 'Cube not found' });
        }
        res.status(200).json(selectedCube);
    } catch (err) {
        console.log('MongoDB Error:', err);
        res.status(500).json({ msg: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const selectedCube = await Cube.findByIdAndDelete(req.params.id);

        if (!selectedCube) {
            return res.status(404).json({ msg: 'Cube not found' });
        }

        res.status(200).json(selectedCube);
    } catch (err) {
        console.log('MongoDB Error:', err);
        res.status(500).json({ msg: err.message });
    }
})

module.exports = router;