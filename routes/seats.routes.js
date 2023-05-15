const db = require("../db");
const express = require("express");
const app = express();
app.get('/seats', (req, res) => {
    res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
    const seatId = req.params.id;
    const seat = db.seats.find(
        item => item.id === parseInt(seatId)
    );
    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});


app.post('/seats', (req, res) => {
    const { day, seat, client, email } = req.body;
    const newSeat = {
        id: generateRandomId(),
        day: day,
        seat: seat,
        client: client,
        email: email,
    };
    db.seats.push(newSeat);
    res.json({ message: 'OK' });
});


app.put('/seats/:id', (req, res) => {
    const seatId = req.params.id;
    const { day, seat, client, email } = req.body;
    const seatNumber = db.seats.find(
        item => item.id === parseInt(seatId)
    );
    if (seatNumber) {
        seat.day = day || seat.day;
        seat.seat = seat || seat.seat;
        seat.client = client || seat.client;
        seat.email = email || seat.client;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});


app.delete('/seats/:id', (req, res) => {
    const seatId = req.params.id;
    const seatIndex = db.seats.findIndex(
        item => item.id === parseInt(seatId)
    );
    if (seatIndex !== -1) {
        db.seats.splice(seatIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});
function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
}
module.exports = app;