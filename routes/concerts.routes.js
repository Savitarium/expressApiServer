const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller')

router.get('/concerts', ConcertController.getAll);
router.get('concert/:id', ConcertController.getId);
router.post('/concerts', ConcertController.post);
router.put('/concerts/:id', ConcertController.put);
router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;