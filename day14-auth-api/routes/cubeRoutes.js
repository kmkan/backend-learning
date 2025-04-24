const express = require('express');
const router = express.Router();
const errorHandler = require('../middleware/errorMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const Cube = require('../models/Cube');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const cubes = await Cube.find();
        res.status(200).json(cubes);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newCube = await Cube.insertOne(req.body);
        res.status(201).json(newCube);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const newCube = await Cube.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        if (!newCube) {
            return res.status(404).json({ msg: 'Cube not found.' });
        }

        res.status(200).json(newCube);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedCube = await Cube.findByIdAndDelete(req.params.id);
        if (!deletedCube) {
            res.status(404).json({ msg: 'Cube not found.' });
        }

        res.status(200).json({ msg: 'Cube deleted.' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})



module.exports = router;