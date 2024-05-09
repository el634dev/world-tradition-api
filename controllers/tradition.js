const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Traditions = require('../models/traditions');
const checkAuth = require('../server');

const app = require('express');

module.exports = (app) => {
    // One tradition (GET)
    app.get('/tradition', checkAuth, async (req, res) => {
        const tradition = await Traditions.aggregate([{$sample: {size: 1} }]);
        res.json({ tradition });
    })

    // ----------------------
    // All traditons (GET)
    app.get('/', checkAuth, async (req, res) => {
        try {
            const traditions = await Traditions.find();
            res.send.json(traditions);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    });

    // ----------------------
    // Create a new tradition (POST)
    app.post('/create', checkAuth, async (req, res) => {
        const tradition = new Traditions({
            tradition: req.body.tradition,
            country: req.body.country,
            holiday: req.body.holiday
        });

        try {
            const newTradition = await tradition.save();
            res.status(200).json(newTradition);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    });

    // ----------------------
    // Update one tradition (POST)
    app.put('/update-tradition/:id', checkAuth, async(req, res) => {
        try {
            const updatedTradition = await Traditions.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedTradition);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    });

    // ----------------------
    // Update specific fields of an tradition (PATCH)
    app.patch('/update-tradition/:id', checkAuth, async(req, res) => {
        try  {
            const updatedTradition = await Traditions.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.json(updatedTradition);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    });

    // ----------------------
    // Delete one tradition (DELETE)
    app.delete('/delete', checkAuth, async (req, res) => {
        try {
            await Traditions.findByIdAndDelete(req.params.id);
            res.json({ message: 'Tradition was deleted successfully' });
        } catch(err) {
            res.status(400).json({ message: err.message });
        };
    });
}

module.exports = app;
