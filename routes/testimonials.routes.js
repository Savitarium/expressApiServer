const db = require("../db");
const express = require("express");
const app = express();
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});


app.get('/testimonials/random', (req, res) => {
    if (db.testimonials.length === 0) {
        res.status(404).json({ error: 'No testimonials found' });
    } else {
        const randomIndex = Math.floor(Math.random() * db.testimonials.length);
        const randomTestimonial = db.testimonials[randomIndex];
        res.json(randomTestimonial);
    }
});


app.get('/testimonials/:id', (req, res) => {
    const testimonialId = req.params.id;
    const testimonial = db.testimonials.find(
        item => item.id === parseInt(testimonialId)
    );
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});


app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const newTestimonial = {
        id: generateRandomId(),
        author: author,
        text: text,
    };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
});


app.put('/testimonials/:id', (req, res) => {
    const testimonialId = req.params.id;
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(
        item => item.id === parseInt(testimonialId)
    );
    if (testimonial) {
        testimonial.author = author || testimonial.author;
        testimonial.text = text || testimonial.text;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});


app.delete('/testimonials/:id', (req, res) => {
    const testimonialId = req.params.id;
    const testimonialIndex = db.testimonials.findIndex(
        item => item.id === parseInt(testimonialId)
    );
    if (testimonialIndex !== -1) {
        db.testimonials.splice(testimonialIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Testimonial not found' });
    }
});
function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
}
module.exports = app;
