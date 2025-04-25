const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ msg: 'User created.', user: newUser });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const currentUser = await User.findOne({ username: req.body.username });
        if (!currentUser) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        const passwordMatch = await currentUser.matchPassword(req.body.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Invalid credentials.' });
        }
        const accessToken = jwt.sign({ userId: currentUser._id}, process.env.SECRET, { expiresIn: '1h' });
        return res.status(200).json({ msg: 'Logged in.', accessToken });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

module.exports = router;