const express = require('express');

const app = express();
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const testimonials = require('./routes/testimonials.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', concerts);
app.use('/api', seats);
app.use('/api', testimonials);

app.use((req, res) => {
    res.status(404).json({message: 'Not found...'});
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
