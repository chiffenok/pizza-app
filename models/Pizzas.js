const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
});

module.exports = Pizza = mongoose.model('pizza', PizzaSchema);
