const Concert = require("../models/concert.model");
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getId = async (req, res) => {

    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

};


exports.post = async (req, res) => {
    try {
    const { performer, genre, price, day, image } = sanitize(req.body);
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
};


exports.put = async (req, res) => {
    const { performer, genre, price, day, image } = sanitize(req.body);
    try {
        const con = await Concert.findByIdAndUpdate(req.params.id, { performer: performer, genre: genre, price: price, day: day, image: image });
        if(con) {
            res.json(await Concert.find());
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ Message: err });
    }
};

exports.delete = async (req, res) => {
    try {
      const con = await Concert.findByIdAndDelete(req.params.id);
      if (con) {
          res.json(await Concert.find());
      } else {
          res.status(404).json({ message: 'Not found...' });
      }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getByPerformer = async (req, res) => {
    try {
        const con = await Concert.find({ performer: req.params.performer });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


exports.getByGenre = async (req, res) => {
    try {
        const con = await Concert.find({ genre: req.params.genre });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getByPrice = async (req, res) => {
    try {
        const con = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max },});
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getByDay = async (req, res) => {
    try {
        const con = await Concert.find({ day: req.params.day });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};