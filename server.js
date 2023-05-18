const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const router = express.Router();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
//import routes
const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', testimonialRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
    res.status(404).send('404 not found...');
});

mongoose.connect('mongodb+srv://nadarvlkan:DVS5BTN441UabQwT@mongodb.zxvffp9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
const io = socket(server);

io.on('connection', (socket) => {
    console.log('new socket');
})

module.exports = server;