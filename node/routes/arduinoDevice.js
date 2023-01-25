var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');
var dbconn = require('../database/dbconn');

router.use(auth);

router.get('/', async (req, res) => {
    try {
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



router.get('/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`SELECT * FROM devices WHERE id = ? ORDER BY created_at DESC`, [id]);
        conn.release();
        res.status(200).send(rows);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })

  router.post('/', async (req, res) => {
    try {
        const deviceName = req.body.name;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`INSERT INTO devices (name) VALUES (?)`, [deviceName]);
        conn.release();
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.put('/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const devicename = req.body.name;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`UPDATE devices SET name = ? WHERE id = ?`, [devicename, id]);
        conn.release();
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })


  router.delete('/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`DELETE FROM devices WHERE id = ?`, [id]);
        conn.release();
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })

module.exports = router;
