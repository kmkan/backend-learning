const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); 
const bcrypt = require('bcrypt'); 

router.post(
    '/register',
    [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }

        const { username, password } = req.body;

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ msg: 'Username is already taken' }); // 400 Bad Request
            }

            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt factor

            const newUser = new User({
                username,
                password: hashedPassword, 
            });

            await newUser.save();

            res.status(201).json({ msg: 'User registered successfully' }); 
             const token = jwt.sign({ userId: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
             res.status(201).json({ msg: 'User registered successfully', token });
        } catch (err) {
            next(err); 
        }
    }
);

module.exports = router;
