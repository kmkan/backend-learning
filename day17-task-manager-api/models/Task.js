const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'done'],
      default: 'pending'
    },
    dueDate: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;