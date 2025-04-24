const express = require('express');
const mongoose = require ('mongoose');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const Cube = require('../models/Cube');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const cubes = await Cube.find();
        res.status(200).json(cubes);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newCube = await Cube.create(req.body);
        res.status(201).json(newCube);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const changedCube = await Cube.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        if (!changedCube) {
            res.status(404).json({ msg: 'Cube not found.' });
        }
        
        res.status(200).json(changedCube);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedCube = await Cube.findByIdAndDelete(req.params.id);
        if (!deletedCube) {
            return res.status(404).json({ msg: 'Cube not found.' });
        }
        res.status(200).json(deletedCube);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

module.exports = router;