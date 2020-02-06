var express = require('express');
var router = express.Router();

var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");

/* GET home page. */
router.get('/', function(req, res, next) {
  Zombie.find().exec(function(error, zombies){
    if(!error){
    console.log(zombies);
    res.render('index', { title: 'Jared', curso: 'Programacion C/S', viewZombies: zombies});
    }
  });
});

router.get('/cerebros', function(req, res) {
  Cerebro.find().exec(function(error, cerebros){
    if(!error){
    console.log(cerebros);
    res.render('cerebros/index', { title: 'Cerebros', data: 'Bienvenido a la tienda de cerebros', viewCerebros: cerebros});
    }
  });
});

/*AQUI ES LA PARTE PARA AGREGAR ZOMBIES*/
router.get('/zombies/add', function(req, res) {
  res.render('add/zombie', { Hide: 'hidden', Alerta: '', Mensaje: ''});
});

router.post('/zombies/new', function(req, res) {
  var data = req.body;

  var nuevoZombie = new Zombie({
    Name: data.name,
    Mail: data.email,
    Type: data.type
  });

  if(data.name && data.email && data.type){
    nuevoZombie.save().then(function() {
      res.render('add/zombie', { Alerta: "alert alert-success", Mensaje: 'Se agrego un zombie', Hide: ''});
    });
  }
  else{
      res.render('add/zombie', { Alerta: "alert alert-danger", Mensaje: 'No se agrego un zombie', Hide: ''});
    }
  });
  
  /*AQUI ES LA PARTE PARA AGREGAR CEREBROS*/
router.get('/cerebros/add', function(req, res) {
  res.render('add/cerebro', { Hide: 'hidden', Alerta: '', Mensaje: ''});
});

router.post('/cerebros/new', function(req, res) {
  var data = req.body;

  var nuevoZombie = new Cerebro({
    Description: data.description,
    Flavor: data.flavor,
    Price: data.price,
    Picture: data.picture
  });

  if(data.description && data.flavor && data.picture && data.price){
    nuevoZombie.save().then(function() {
      res.render('add/cerebro', { Alerta: "alert alert-success", Mensaje: 'Se agrego un cerebro', Hide: ''});
    });
  }
  else{
      res.render('add/cerebro', { Alerta: "alert alert-danger", Mensaje: 'No se agrego un cerebro', Hide: ''});
  }
});

module.exports = router;
