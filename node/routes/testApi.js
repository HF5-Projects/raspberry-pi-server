var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');

router.use(auth);

router.post('/testApi', function(req, res, next) {
    res.status(201).send(req.body); 
});

module.exports = router;
