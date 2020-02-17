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
      res.render('zombies/add', { Alerta: "alert alert-success", Mensaje: "Zombie agregado", Hide: ''});
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
      res.render('cerebros/add', { Alerta: "alert alert-success", Mensaje: "Cerebro agregado", Hide: ''});
    }
  });
});

/*AQUI ES LA PARTE PARA EDITAR ZOMBIES*/
router.get('/zombies/edit/:id', async function(req,res) {
  var Zombie = await Zombie.findById(req.params.id);
  res.render('zombies/edit', {Zombie: Zombie});
});

router.put('/zombies/edit/:id', async function(req,res) {
  var Zombie = await Zombie.findById(req.params.id);

  try {
    Zombie.Name = req.body.Name;
    Zombie.Mail = req.body.Mail;
    Zombie.Type = req.body.Type;
    console.log(Zombie);

    await Zombie.save();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.render('zombies/edit', {Zombie: Zombie});
  }
});

/*AQUI ES LA PARTE PARA EDITAR CEREBROS*/
router.get('/cerebros/edit/:id', async function(req,res) {
  var Cerebro = await Cerebro.findById(req.params.id);
  res.render('cerebros/edit', {Cerebro: Cerebro});
});

router.put('/cerebros/edit/:id', async function(req, res) {
  var Cerebro = await Cerebro.findById(req.params.id);
  try {
    Cerebro.Description = req.body.Description;
    Cerebro.Flavor = req.body.Flavor;
    Cerebro.Price = req.body.Price;
    Cerebro.Picture = req.body.Picture;
    console.log(Cerebro);

    await Cerebro.save();
    res.redirect('/cerebros')
  } catch (error) {
    console.log(error.message);
    res.render('cerebros/edit', {Cerebro: Cerebro});
  }
});

/*AQUI ES LA PARTE PARA ELIMINAR ZOMBIES*/
router.get('/zombies/delete/:id', async function(req, res) {
  var Zombie = await Zombie.findById(req.params.id);
  res.render('zombies/delete', {Zombie: Zombie});
});

router.delete('/zombies/delete/:id', async function(req, res) {
  var Zombie = await Zombie.findById(req.params.id);

  try {
    Zombie.remove();
    res.redirect('/');
  } catch (error) {
    res.render('zombies/delete', {Zombie: Zombie});
  }
});

/*AQUI ES LA PARTE PARA ELIMINAR CEREBROS*/
router.get('/cerebros/delete/:id', async function(req, res) {
  var Cerebro = await Cerebro.findById(req.params.id);
  res.render('cerebros/delete', {Cerebro: Cerebro});
});

router.delete('/cerebros/delete/:id', async function(req, res) {
  var Cerebro = await Cerebro.findById(req.params.id);

  try {
    Cerebro.remove();
    res.redirect('/cerebros');
  } catch (error) {
    res.render('cerebros/delete', {Zombie: Zombie});
  }
});

module.exports = router;
