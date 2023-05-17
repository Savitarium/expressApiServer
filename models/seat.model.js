const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    day: { type: String, require: true },
    seat: { type: String, require: true },
    client: { type: String, require: true },
    email: { type: String, require: true }
});

module.exports = mongoose.model('Seat', seatSchema);