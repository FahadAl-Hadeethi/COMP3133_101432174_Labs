const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/cuisine/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine: { $regex: new RegExp(`^${cuisine}$`, 'i') } });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/sort', async (req, res) => {
    try {
        const sortBy = req.query.sortBy === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}, {
            _id: 0, cuisine: 1, name: 1, city: 1, restaurant_id: 1
        }).sort({ restaurant_id: sortBy });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find(
            {
                cuisine: { $regex: /^Delicatessen$/i },
                city: { $ne: 'Brooklyn' }
            },
            { _id: 0, cuisine: 1, name: 1, city: 1 }
        ).sort({ name: 1 });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
