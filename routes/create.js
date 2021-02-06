var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");
const {handlebars} = require('hbs');


/*get the create cube page*/
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create a Cube' });
});
//process the create cube form
router.post('/', function(req, res, next) {
    console.log('create cube form fired');
    console.log(req.body);
    let data = req.body;
    let cube = new Cube({
        name: data.name, 
        description: data.description, 
        imageUrl: data.imageUrl, 
        difficulty: data.difficultyLevel,
        accessories: []
    });
    cube.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
    });
});
//create a cube accessory - runs on base of /create file, no need to put the /creat/ before
//don't need a separate accessory route on the app.js file because it runs under the create router, just need  it here as a .get /new file name
router.get('/accessory', function(req, res, next) {
    res.render('createAccessory', { title: 'Create Cube Accessory'});
});
//process the add accessory form
router.post('/accessory', function(req, res, next) {
    console.log('create accessory post');
    console.log('incoming form submission', req.body);
    let data = req.body;
    const accessory = new Accessory({
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,        
        cubes: []
    });
    //this is a promise...save the accessory that is created
    accessory.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
        })
        .catch((err) => {
            res.send(err);
        });
});
module.exports = router;