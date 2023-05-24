const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        unique: true,
        type: String,
        require: true 
    },
    email: {
        unique: true,
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User