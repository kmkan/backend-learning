require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const findExisting = await User.findOne({ name: req.body.name });
        if (findExisting) {
            return res.status(404).json({ msg: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ name: req.body.name, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ name: req.body.name });
        if (!foundUser) {
            return res.status(404).json({ msg: 'User does not exist. '});
        }

        const rightPassword = await bcrypt.compare(req.body.password, foundUser.password);
        if (!rightPassword) {
            return res.status(401).json({ msg: 'Invalid password.' });
        }
        const accessToken = jwt.sign({ sub: foundUser._id }, process.env.SECRET);
        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

module.exports = router;
