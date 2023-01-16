var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.status(201).send("Be mdsdsddsyd love");
});

module.exports = router;
