var express = require('express');
var router = express.Router();
var auth = require('../middleware/jwt');
var dbconn = require('../database/dbconn');

router.use(auth);

router.get('/', async (req, res) => {
    try {
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`SELECT * FROM settings`);
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
        const rows = await conn.query(`SELECT * FROM settings WHERE id = ('${id}')`);
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
        const name = req.body.name;
        const value = req.body.value;
        const value_type = req.body.value_type;
        const conn = await dbconn.getConnection();
        const rows = await conn.query(`INSERT INTO settings (name,value,value_type) VALUES ('${name}','${value}','${value_type}')`);
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
        const rows = await conn.query(`UPDATE devices SET name = ('${devicename}') WHERE id = ('${id}')`);
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
        const rows = await conn.query(`DELETE FROM settings WHERE id = ('${id}')`);
        conn.release();
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  })

module.exports = router;
