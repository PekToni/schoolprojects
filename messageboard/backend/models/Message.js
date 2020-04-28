const mongoose = require('mongoose');
const Reply = require('./Reply');

const MessageSchema = new mongoose.Schema({
    user: { type: String, unique: false, required: true },
    title: { type: String, unique: false, required: true },
    message: { type: String, unique: false, required: true },
    reply: { type: [Reply], required: false },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;