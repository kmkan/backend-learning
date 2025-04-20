const validateCube = (req, res, next) => {
    const { brand, name, size, stickerless } = req.body;

    if (!brand) {
        return res.status(400).json({ msg: "Please enter a brand..." });
    } else if (!name) {
        return res.status(400).json({ msg: "Please enter a name..." });
    } else if (isNaN(size) || size <= 0) {
        return res.status(400).json({ msg: "Please enter a valid size..." });
    } else if (typeof stickerless !== 'boolean') {
        return res.status(400).json({ msg: "Please enter true or false..." });
    }

    next();
}

module.exports = validateCube;