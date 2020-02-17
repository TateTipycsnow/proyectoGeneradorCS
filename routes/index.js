var express = require('express');
var router = express.Router();

var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");

/* GET home page. */
router.get('/', function(req, res, next) {
  Zombie.find().exec(function(error, zombies){
    if(!error){
      console.log(zombies);
      res.render('zombies/index', { title: 'Jared', curso: 'Programacion C/S', viewZombies: zombies});
    }
    else{
      console.log(error.message);
    }
  });
});

router.get('/cerebros', function(req, res) {
  Cerebro.find().exec(function(error, cerebros){
    if(!error){
      console.log(cerebros);
      res.render('cerebros/index', { title: 'Cerebros', data: 'Bienvenido a la tienda de cerebros', viewCerebros: cerebros});
    }
    else{
      console.log(error.message);
    }
  });
});

/*AQUI ES LA PARTE PARA AGREGAR ZOMBIES*/
router.get('/zombies/add', function(req, res) {
  res.render('zombies/add', { Hide: 'hidden', Alerta: '', Mensaje: ''});
});

router.post('/zombies/new', function(req, res) {
  var data = req.body;

  var nuevoZombie = new Zombie({
    Name: data.name,
    Mail: data.email,
    Type: data.type
  });
  
  nuevoZombie.save(function(error) {
    let Campos = ["Name", "Mail", "Type"];

    if(error) {
      for(var i=0; i < Campos.length; i++) {
        var Campo = Campos[i];
        if(error.errors[Campo]) {
          mensajeResultante = error.errors[Campo].message;
          res.render('zombies/add', { Alerta: "alert alert-danger", Mensaje: mensajeResultante, Hide: ''});
        }
      }
    }
    else {
      res.render('zombies/add', { Alerta: "alert alert-succes", Mensaje: "Zombie agregado", Hide: ''});
    }
  });
});
  
  /*AQUI ES LA PARTE PARA AGREGAR CEREBROS*/
router.get('/cerebros/add', function(req, res) {
  res.render('cerebros/add', { Hide: 'hidden', Alerta: '', Mensaje: ''});
});

router.post('/cerebros/new', function(req, res) {
  var data = req.body;

  var nuevoCerebro = new Cerebro({
    Description: data.description,
    Flavor: data.flavor,
    Price: data.price,
    Picture: data.picture
  });

  nuevoCerebro.save(function(error) {
    let Campos = ["Description", "Flavor", "Price", "Picture"];

    if(error) {
      for(var i=0; i < Campos.length; i++) {
        var Campo = Campos[i];
        if(error.errors[Campo]) {
          mensajeResultante = error.errors[Campo].message;
          res.render('cerebros/add', { Alerta: "alert alert-danger", Mensaje: mensajeResultante, Hide: ''});
        }
      }
    }
    else {
      res.render('cerebros/add', { Alerta: "alert alert-succes", Mensaje: "Cerebro agregado", Hide: ''});
    }
  });
  
});

module.exports = router;
