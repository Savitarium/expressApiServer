const db = require("../db");
const express = require("express");
const app = express();
app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
    const concertId = req.params.id;
    const concert = db.concerts.find(
        item => item.id === parseInt(concertId)
    );
    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});


app.post('/concerts', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = {
        id: generateRandomId(),
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
    };
    db.concerts.push(newConcert);
    res.json({ message: 'OK' });
});


app.put('/concerts/:id', (req, res) => {
    const concertId = req.params.id;
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find(
        item => item.id === parseInt(concertId)
    );
    if (concert) {
        concert.performer = performer || concert.performer;
        concert.genre = genre || concert.genre;
        concert.price = price || concert.price;
        concert.day = day || concert.day;
        concert.image = image || concert.image;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});

app.delete('/concerts/:id', (req, res) => {
    const concertId = req.params.id;
    const concertIndex = db.concerts.findIndex(
        item => item.id === parseInt(concertId)
    );
    if (concertIndex !== -1) {
        db.concerts.splice(concertIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});
function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
}
module.exports = app;