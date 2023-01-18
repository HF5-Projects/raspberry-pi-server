var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');
var dbconn = require('../database/dbconn');

router.use(auth);

router.get('/testApi', async (req, res) => {
    try {
        const name = req.body.name;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`SELECT * FROM devices`);
        conn.release();
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })



  router.post('/testApi', async (req, res) => {
    try {
        const name = req.body.name;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`INSERT INTO devices (name) VALUES ('${name}')`);
        conn.release();
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.put('/testApi/:name/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.params.name;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`UPDATE devices SET name = ('${name}') WHERE id = ('${id}')`);
        conn.release();
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.delete('/testApi/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`DELETE FROM devices WHERE id = ('${id}')`);
        conn.release();
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })

module.exports = router;
