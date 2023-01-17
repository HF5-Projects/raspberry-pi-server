var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');
var dbconn = require('../database/dbconn');

router.use(auth);

router.post('/testApi', async function(req, res, next) {
    try {
        const conn = await dbconn.getConnection();
        const rows = await conn.query("SELECT * FROM devices");
        conn.release();
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;
