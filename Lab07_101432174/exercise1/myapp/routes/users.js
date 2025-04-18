const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send('Users Route Working!');
});

router.post('/', (req, res) => {
    console.log('Received Data:', req.body);
    res.send('POST received!');
});

module.exports = router;
