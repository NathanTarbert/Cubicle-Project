var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Weldome to Cubicle\nPlease Register' });
    // res.send('This is working');
});

module.exports = router;