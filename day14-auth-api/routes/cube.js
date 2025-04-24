const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');

router.get('/', async (req, res, next) => {
    try {
        const cubes = await Cube.find();
        res.status(200).json(cubes);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newCube = await Cube.insertOne(req.body);
        res.status(201).json(newCube);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const newCube = await Cube.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        if (!newCube) {
            return res.status(404).json({ msg: 'Cube with that id not able to be updated.' });
        }
        res.status(200).json(newCube);
    } catch (err) {
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const newCube = await Cube.findByIdAndDelete(req.params.id);
        if (!newCube) {
            return res.status(404).json({ msg: 'Cube with that id not able to be deleted.' });
        }
    
        res.status(200).json(newCube);
    } catch (err) {
        next(err);
    }
})


module.exports = router;