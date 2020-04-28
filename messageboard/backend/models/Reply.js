const mongoose = require('mongoose');

const Reply = new mongoose.Schema({
    user: { type: String, unique: false, required: true },
    title: { type: String, unique: false, required: true },
    message: { type: String, unique: false, required: true },
});

//const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;