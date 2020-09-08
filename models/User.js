const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    givenLikes: {
        type: Number,
        default: 0,
    },
});

module.exports = User = mongoose.model('user', UserSchema);
