const express = require('express');
const validateCube = require('../middleware/validateCube');

const router = express.Router();

const cubes = [
    {
      "id": 1,
      "brand": "Gan",
      "name": "Gan 356 M",
      "size": 56,
      "stickerless": true
    },
    {
      "id": 2,
      "brand": "Moyu",
      "name": "Weilong WR M",
      "size": 55,
      "stickerless": false
    },
    {
      "id": 3,
      "brand": "QiYi",
      "name": "MS 3x3",
      "size": 56,
      "stickerless": true
    },
    {
      "id": 4,
      "brand": "Yuxin",
      "name": "Little Magic",
      "size": 55,
      "stickerless": true
    },
    {
      "id": 5,
      "brand": "Dayan",
      "name": "TengYun V2 M",
      "size": 55,
      "stickerless": false
    }
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
    return res.status(404).json({ msg: `Cube with id ${id} not found...` }); 
}

res.status(200).json(cube);

})

router.get('/error/error', (req, res) => {
  throw new Error("JKFDJKDJFKD");
})

router.post('/', validateCube, (req, res) => {
    const { brand, name, size, stickerless } = req.body;
    
    const newCube = {
        id: cubes.length + 1,
        brand: brand,
        name: name,
        size: size,
        stickerless: stickerless
    };

    cubes.push(newCube);    

    res.status(201).json(cubes);
})

module.exports = router
  