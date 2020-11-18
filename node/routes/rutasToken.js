const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middleware = require('./middleware')

const { body, param, validationResult } = require('express-validator');

router.use(middleware.checkToken);

router.get('/mainUser', (req, res) => {
    let id = req.idUsuario;
    user.getById(connection, id, (data => {
        res.json(data);
    }))
});

router.get('/users', [], (req, res) => {
    user.getAll(connection, (data => {
        res.json(data);
    }))
});

router.post('/user', (req, res) => {
    let body = req.body;
    user.create(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/user/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getById(connection, id, (data => {
        res.json(data);
    }))
});

router.get('/user/:correo', [
    param('correo').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let correo = req.params.correo;
    user.getByCorreo(connection, correo, (data => {
        res.json(data);
    }))
});

router.get('/productos', [], (req, res) => {
    user.getAllProductos(connection, (data => {
        res.json(data);
    }))
});

router.get('/mainUser-datos', (req, res) => {
    let id = req.idUsuario;
    user.getDatosUsuario(connection, id, (data => {
        res.json(data);
    }))
});

router.put('/usuario', [], (req, res) => {
    let body = req.body;
    body.id = req.idUsuario;
    user.updateUser(connection, body, (data => {
        res.json(data);
    }))
});

router.put('/direccion', [], (req, res) => {
    let body = req.body;
    body.id_usuario = req.idUsuario;
    user.updateDireccion(connection, body, (data => {
        res.json(data);
    }))
});

module.exports = router;