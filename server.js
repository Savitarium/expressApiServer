const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const testimonials = require('./routes/testimonials.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', cors(), concerts);
app.use('/api', cors(), seats);
app.use('/api', cors(), testimonials);
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({message: 'Not found...'});
});
app.use(cors());

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
