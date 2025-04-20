const express = require('express');
const router = express.Router();

let cubes = [
    {id: 1, brand: "Moyu", name: "Weilong WRM", stickerless: true},
    {id: 2, brand: "Gan", name: "356 M", stickerless: true},
    {id: 3, brand: "YJ", name: "MGC V2", stickerless: false}
]

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(cubes.slice(0, limit));
    }

    res.status(200).json(cubes);
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cube = cubes.find(cube => cube.id === id);

    if (!cube) {
        return res.status(400).json({ msg: `Cube with id ${id} doesn't exist...` });
    } 

    res.status(200).json(cube);
})

router.post('/', (req, res) => {
    const name = req.body.name;
    const brand = req.body.brand;
    const size = req.body.size;
    const stickerless = req.body.stickerless;

    if (!name) {
        return res.status(400).json({ msg: "Please include a name..."});
    } else if (!brand) {
        return res.status(400).json({ msg: "Please include a brand..."});
    } else if (isNaN(size)) {
        return res.status(400).json({ msg: "Please include a valid size..."});
    } else if (typeof stickerless !== 'boolean') {
        return res.status(400).json({ msg: "Please include true or false..."});
    }

    const newCube = {
        id: cubes.length + 1,
        name: name,
        brand: brand,
        size: size,
        stickerless: stickerless
    }

    cubes.push(newCube);

    res.status(201).json(newCube);
})

module.exports = router