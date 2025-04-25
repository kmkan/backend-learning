const express = require('express');
const mongoose = require('mongoose');
const authenticator = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', authenticator, async (req, res) => {
    const query = { owner: req.user.userID };

    if (req.query.status) {
        query.status = req.query.status;
    }

    if (req.query.dueBefore) {
        query.dueDate = { $lte: new Date(req.query.dueBefore )};
    }

    try {
        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.get('/:id', authenticator, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params._id, owner: req.user._id });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post('/', authenticator, async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.put('/:id', authenticator, async (req, res) => {
    try {
        const selectedTask = await Task.findByIdAndUpdate({ _id: req.params.id, owner: req.user.userId }, req.body, {runValidators: true, new: true});
        if (!selectedTask) {
            return res.status(404).json({ msg: 'Task not found.' });
        }
        res.status(200).json({ msg: 'Task modified.', selectedTask });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete('/:id', authenticator, async (req, res) => {
    try {
        const selectedTask = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user.userId });
        if (!selectedTask) {
            return res.status(404).json({ msg: 'Task not found.' });
        }
        res.status(200).json({ msg: 'Task deleted.', selectedTask });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;