const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isuser: { type: Boolean, required: true },
    isadmin: { type: Boolean, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;