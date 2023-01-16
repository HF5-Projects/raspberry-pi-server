var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');

router.post('/testApi', auth, function(req, res, next) {
    res.status(201).send(req.body); 
});

module.exports = router;
