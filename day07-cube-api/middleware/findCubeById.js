const findCubeById = (cubesArray) => {
        return (req, res, next) => {
        const id = parseInt(req.params.id);
        const cube = cubesArray.find(cube => cube.id === id);

        if (!cube) {
            return res.status(404).json({ msg: `Cube with id ${id} not found...` });
        }

        req.cube = cube;
        next();
    }
}

module.exports = findCubeById;