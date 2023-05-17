const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    performer: { type: String, require: true },
    genre: { type: String, require: true },
    price: { type: String, require: true },
    day: { type: String, require: true },
    image: { type: String, require: true }
});

module.exports = mongoose.model('Concert', concertSchema);