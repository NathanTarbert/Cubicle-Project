var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  Cube.find().then((cube) => {
    res.render('index', {title:"Cubicle", cube: cube , user: req.user});
  });
});
router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
});

module.exports = router;