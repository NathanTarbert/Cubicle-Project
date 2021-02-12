var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      // console.log("The single cube results from details route are ", results);
      // console.log("the accessories results from details route are ", results.accessories);
      let accessories = results.accessories;
      res.render('details', { title: 'These are the details', cube: results, accessories: accessories , user: req.user});
    }); 
});

module.exports = router;