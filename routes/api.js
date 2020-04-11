var express = require('express');
var router = express.Router();

var Zombie = require('../models/zombie');
var Cerebro = require('../models/cerebro');
var Users = require('../models/users');
var Orders = require('../models/orders');

var jwt = require('jsonwebtoken');

router.get('/zombies', async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if (!error) {
            res.status(200).json(zombies);
        } else {
            res.status(500).json(error);
        }
    });
});

router.get('/zombiesByUser/:id', async(req, res) => {
    var data = req.params;

    Zombie.find({ UserId: data.id }).exec((error, zombies) => {
        if (!error) {
            res.status(200).json(zombies);
        } else {
            res.status(500).json(error);
        }
    });
});

router.post('/zombies/new', async function(req, res) {
    var data = req.body;

    var nuevoZombie = new Zombie({
        Name: data.Name,
        Mail: data.Mail,
        Type: data.Type,
        UserId: data.UserId
    });

    nuevoZombie.save(function(error) {

        if (error) {
            res.status(500).json({ Alerta: "alert alert-danger", Mensaje: error.errors, Hide: '' });

        } else {
            res.status(200).json({ Alerta: "alert alert-success", Mensaje: "Zombie agregado", Hide: '' });
        }
    });
});

router.delete('/zombies/delete/:id', async function(req, res) {
    var id = req.params.id;
    await Zombie.findByIdAndRemove(id);
    res.json({ mensaje: 'Eliminado' });
});

router.put('/zombies/edit/:id', async function(req, res) {
    var data = req.body;
    var id = req.params.id;

    var ZombieU = {
        Name: data.Name,
        Mail: data.Mail,
        Type: data.Type,
        UserId: data.UserId
    };

    await Zombie.findByIdAndUpdate(id, { $set: ZombieU });
    res.json({ status: 'Actualizado' });
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

router.get('/cerebrosByUser/:id', async(req, res) => {
    var data = req.params;

    Cerebro.find({ UserId: data.id }).exec((error, cerebros) => {
        if (!error) {
            res.status(200).json(cerebros);
        } else {
            res.status(500).json(error);
        }
    });
});

router.get('/cerebrosCountFlavor/:id', async(req, res) => {
    var data = req.params;

    Cerebro.count({ Flavor: data.id }).exec((error, cerebros) => {
        if (!error) {
            res.status(200).json(cerebros);
        } else {
            res.status(500).json(error);
        }
    });
});

router.get('/cerebrosCountFlavorUser/:id/:user', async(req, res) => {
    var data = req.params;

    Cerebro.count({ Flavor: data.id, User: data.user }).exec((error, cerebros) => {
        if (!error) {
            res.status(200).json(cerebros);
        } else {
            res.status(500).json(error);
        }
    });
});

router.post('/cerebros/new', async function(req, res) {
    var data = req.body;

    var nuevoCerebro = new Cerebro({
        Description: data.Description,
        Flavor: data.Flavor,
        Price: data.Price,
        Picture: data.Picture,
        UserId: data.UserId,
        User: data.Username
    });

    nuevoCerebro.save(function(error) {
        if (error) {
            res.status(500).json({ Alerta: "alert alert-danger", Mensaje: error.errors, Hide: '' });

        } else {
            res.status(200).json({ Alerta: "alert alert-success", Mensaje: "Cerebro agregado", Hide: '' });
        }
    });
});

router.delete('/cerebros/delete/:id', async function(req, res) {
    var id = req.params.id;
    await Cerebro.findByIdAndRemove(id);
    res.json({ mensaje: 'Eliminado' });
});

router.put('/cerebros/edit/:id', async function(req, res) {
    var data = req.body;
    var id = req.params.id;

    var cerebroU = {
        Description: data.Description,
        Flavor: data.Flavor,
        Price: data.Price,
        Picture: data.Picture,
        UserId: data.UserId,
        Username: data.Username
    };

    await Cerebro.findByIdAndUpdate(id, { $set: cerebroU });
    res.json({ status: 'Actualizado' });
});

router.post('/register', function(req, res) {
    var data = req.body;
    var nuevoUsuario = new Users({
        Username: data.Username,
        Mail: data.Mail,
        Rol: data.Rol,
        Image: data.Image,
        Password: Users.hashPassword(data.Password)
    });

    let Usuario = nuevoUsuario.save();

    Usuario.then(function(doc) {
        return res.status(200).json(doc);
    });

    Usuario.catch(function(error) {
        return res.status(500).json({ message: "Error de registro", error });
    });
});

router.post('/login', function(req, res) {
    var data = req.body;
    let Usuario = Users.findOne({ Mail: data.Mail }).exec();

    Usuario.then(function(doc) {
        if (doc) {
            if (doc.isValid(data.Password)) {
                let token = jwt.sign({ _id: doc._id, Username: doc.Username, Rol: doc.Rol, Image: doc.Image }, 'secret', { expiresIn: '3h' });
                return res.status(200).json(token);
            } else {
                return res.status(500).json({ message: "Credenciales invalidas" });
            }
        } else {
            return res.status(500).json({ message: "Email no registrado" });
        }
    });

    Usuario.catch(function(error) {
        return res.status(500).json({ message: "Internal Error", error: error });
    });
});

router.get('/orders/:id', async(req, res) => {
    var data = req.params;

    Orders.find({ UserId: data.id }).exec((error, orders) => {
        if (!error) {
            res.status(200).json(orders);
        } else {
            res.status(500).json(error);
        }
    });
});

router.post('/orders/new', async function(req, res) {
    var data = req.body;

    var nuevaOrden = new Orders({
        Seller: data.Seller,
        Flavor: data.Flavor,
        Price: data.Price,
        Date: data.Date,
        Amount: data.Amount,
        UserId: data.UserId
    });

    nuevaOrden.save(function(error) {
        if (error) {
            res.status(500).json({ Alerta: "alert alert-danger", Mensaje: error.errors, Hide: '' });
        } else {
            res.status(200).json({ Alerta: "alert alert-success", Mensaje: "Cerebro agregado", Hide: '' });
        }
    });
});

router.get('/username', verifyToken, function(req, res, next) {
    return res.status(200).json(decodedToken);
});

var decodedToken = '';

function verifyToken(req, res, next) {
    let token = req.query.token;
    jwt.verify(token, 'secret', function(err, tokendata) {
        if (err) {
            return res.status(400).json({ message: 'Unauthorized Request' });
        }
        if (tokendata) {
            decodedToken = tokendata;
            console.log(tokendata);
            next();
        }
    });
}

module.exports = router;