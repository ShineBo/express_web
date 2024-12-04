const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    customId: { type: Number, unique: true },
    name: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    category: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    description: { type: String }
});

module.exports = mongoose.model('Drink', drinkSchema);