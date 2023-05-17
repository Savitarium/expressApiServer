const Seat = require("../models/seat.model");
const Concert = require("../models/concert.model");

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
exports.getId = async (req, res) => {
    try {
        const sea = await Seat.findById(req.params.id);
        if(!sea) res.status(404).json({ message: 'Not found' });
        else res.json(sea);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

};
exports.post = async (req, res) => {
    try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
};
exports.delete = async (req, res) => {
    try {
        const sea = await Seat.findByIdAndDelete(req.params.id);
        if (sea) {
            res.json(await Seat.find());
        } else {
            res.status(404).json({message: 'Not found...'});
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};
exports.put = async (req, res) => {
    const {day, seat, client, email} = req.body;
    try {
        const sea = await Seat.findByIdAndUpdate(req.params.id, {
            day: day,
            seat: seat,
            client: client,
            email: email
        }, {new: true});
        if (sea) {
            res.json(await Seat.find());
        } else {
            res.status(404).json({message: 'Not found...'});
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};