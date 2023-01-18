var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');
var dbconn = require('../database/dbconn');

router.use(auth);


router.get('/', async (req, res) => {
    try {
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`SELECT * FROM device_logs`);
        conn.release();
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })



router.get('/device_id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`SELECT * FROM device_logs WHERE device_id = ('${id}')`);
        conn.release();
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`SELECT * FROM device_logs WHERE id = ('${id}')`);
        conn.release();
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.post('/:id', async (req, res) => {
    try {
        const deviceMessage = req.body.message;
        const deviceId = req.params.id;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`INSERT INTO device_logs (device_id,message) VALUES ('${deviceId}','${deviceMessage}')`);
        conn.release();
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.put('/:name/id/:id', async (req, res) => {
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
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })

module.exports = router;
