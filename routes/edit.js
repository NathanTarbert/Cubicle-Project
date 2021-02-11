var express = require('express');
const { Result } = require('express-validator');
var router = express.Router();
const Cube = require("../models/cube");

router.get('/:id/', (req, res, next) => {
    let id = req.params.id;
    console.log('edit id is', id);
    Cube.findOne((err, cube) => {
        if (err) return res.status(500).send(err);
        res.render('editCubePage', {cube: cube, user: req.user});
    });
});
// router.post('/:id', (req, res) => {
//     let id = req.params.id;
//     res.redirect('/');
// });
  module.exports = router;