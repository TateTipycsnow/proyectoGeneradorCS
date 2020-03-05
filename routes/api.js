let express = require('express');
let router = express.Router();

let Zombie = require('../models/zombie');
let Cerebro = require('../models/cerebro');

router.get('/zombies', async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if (!error) {
            res.status(200).json(zombies);
        } else {
            res.status(500).json(error);
        }
    });
});

router.get('/cerebros', async(req, res) => {
    Cerebro.find().exec((error, cerebros) => {
        if (!error) {
            res.status(200).json(cerebros);
        } else {
            res.status(500).json(error);
        }
    });
});

module.exports = router;