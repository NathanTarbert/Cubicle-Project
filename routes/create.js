var express = require('express');
var router = express.Router();
const cubes = require('../config/database.json');
const cubesPath = './config/database.json';
const fs = require('fs');
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");
const {handlebars} = require('hbs');
/* GET add cube page*/
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create a Cube' });
});

router.get('/accessory', function(req, res, next) {
    res.render('accessory', { title: 'Create Accessory'});
});
//make your form post request script
router.post('/', function(req, res, next) {
    console.log('incoming', req.body);

    const newCube = new Cube({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: req.body.difficultyLevel,
        accessories: []
    });

    //this is a promise...
    newCube.save()
    .then((result) => {
        console.log(result);
        res.redirect('/');
    })
        .catch((err) => {
        res.send(err);
    });

    router.post('/accessory', function(req, res, next) {
        console.log('incoming form submission', req.body);
    
        const newCube = new Cube({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficultyLevel,            
        });
    
        //this is a promise...
        newCube.save()
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
            .catch((err) => {
            res.send(err);
        });
    });
});

module.exports = router;





