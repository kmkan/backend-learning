const express = require('express');
const router = express.Router();
const findCubeById = require('../middleware/findCubeById');

const cubes = [
    { "id": 1, "brand": "Gan",   "name": "356 XS",      "size": 56, "stickerless": true },
    { "id": 2, "brand": "Moyu",  "name": "Weilong WRM", "size": 55, "stickerless": false },
    { "id": 3, "brand": "QiYi",  "name": "MS 3x3",      "size": 56, "stickerless": true },
];
  
router.get('/', (req, res) => {
    res.status(200).json(cubes);
})

router.get('/:id', findCubeById(cubes), (req, res) => {
    const cube = req.cube;

    res.status(200).json(cube);
})

router.post('/', (req, res) => {
    const { brand, name, size, stickerless } = req.body;

    if (!brand) {
        return res.status(400).json({ msg: "Please enter a brand." });
    } else if (!name) {
        return res.status(400).json({ msg: "Please enter a name." });
    } else if (isNaN(size) || size <= 0) {
        return res.status(400).json({ msg: "Please enter a size greater than 0." });
    } else if (typeof(stickerless) !== 'boolean') {
        return res.status(400).json({ msg: "Please enter true or false for stickerless."});
    }

    const newCube = {id: cubes.length + 1, brand, name, size, stickerless };
    cubes.push(newCube);
    res.status(201).json(cubes);
})

router.put('/:id', findCubeById(cubes), (req, res) => {
    const cube = req.cube;

    const { brand, name, size, stickerless } = req.body;

    if (brand !== undefined) cube.brand = brand;
    if (name !== undefined) cube.name = name;
    if (size !== undefined) cube.size = parseInt(size);
    if (stickerless !== undefined) cube.stickerless = stickerless;

    res.status(201).json(cubes);
})

router.delete('/:id', findCubeById(cubes), (req, res) => {
    const cube = req.cube;

    const index = cubes.indexOf(cube);
    cubes.splice(index, 1);

    res.status(201).json(cubes);
})

module.exports = router;