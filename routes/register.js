var express = require('express');
const { restart } = require('nodemon');
var router = express.Router();
var User = require('../models/user');
const bycrypt = require('bcrypt'); 
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Please Register' });
});

router.post('/', async function(req, res, next) {
    console.log('Register is working', req.body);
    
    const user = new User(req.body);
    try {
       await user.save();
       const token = await user.generateAuthToken();
       res.status(201).send({ user, token });
      
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;


