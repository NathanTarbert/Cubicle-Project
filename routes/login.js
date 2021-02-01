var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login Page' });
    // res.send('This is working');
});

module.exports = router;