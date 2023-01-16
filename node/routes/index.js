var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(201).send("Be mdsdsddsyd love");
});

router.get('/parse', function(req, res, next) {
  res.send('return asdasdasd mor parse.js');
});

module.exports = router;
