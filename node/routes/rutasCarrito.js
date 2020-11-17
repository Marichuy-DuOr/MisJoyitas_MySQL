const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middleware = require('./middleware')

const { body, param, validationResult } = require('express-validator');

router.use(middleware.checkToken);

router.get('/productos/:tipo', [
    param('tipo').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }

    let tipo = req.params.tipo;
    user.getTipoProducto(connection, tipo, (data => {
        res.json(data);
    }))
});

router.get('/producto/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getIdProducto(connection, id, (data => {
        res.json(data);
    }))
});

router.post('/carrito', [], (req, res) => {
    let body = req.body;
    body.id_usuario = req.idUsuario;
    user.createCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/carrito', [], (req, res) => {
    let id = req.idUsuario;
    user.getAllCarrito(connection, id, (data => {
        res.json(data);
    }))
});

router.put('/carrito', [], (req, res) => {
    let body = req.body;
    
    user.updateCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.delete('/carrito/:id/:cantidad', [
    param('id').not().isEmpty().isNumeric(),
    param('cantidad').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    params.id_usuario = req.idUsuario;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteProdCarrito(connection, params, (data => {
        res.json(data);
    }))
});

router.post('/venta', [], (req, res) => {
    let body = req.body;
    user.createVenta(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/producto_venta', [], (req, res) => {
    let body = req.body;
    user.createProducto_Venta(connection, body, (data => {
        res.json(data);
    }))
});

module.exports = router;