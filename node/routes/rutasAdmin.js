const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middlewareRol = require('./middleware_roles');

const { body, param, validationResult } = require('express-validator');

router.use(middlewareRol.checkRole);

router.delete('/producto/:id', [
    param('id').not().isEmpty().isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteProducto(connection, params, (data => {
        res.json(data);
    }))
});

router.put('/producto', [], (req, res) => {
    let body = req.body;
    user.updateProducto(connection, body, (data => {
        res.json(data);
    }))
});

router.put('/producto-activacion', [], (req, res) => {
    let body = req.body;
    user.activarProducto(connection, body, (data => {
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

router.post('/producto', (req, res) => {
    let body = req.body;
    req.body.is_active = 1;
    req.body.existencia = 0;
    user.createProducto(connection, body, (data => {
        res.json(data);
    }));
});

router.put('/cambiar-rol', [], (req, res) => {
    let body = req.body;
    user.updateRol(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/roles', (req, res) => {
    let id = req.idUsuario;
    user.getRolesUsuarios(connection, id, (data => {
        res.json(data);
    }))
});

router.get('/producto-nombre/:busqueda', [
    param('busqueda').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let busqueda = req.params.busqueda;
    user.getProductoPorNombre(connection, busqueda, (data => {
        res.json(data);
    }))
});

router.get('/productos-inactivos', [], (req, res) => {
    user.getAllProductosInactivos(connection, (data => {
        res.json(data);
    }))
});

module.exports = router;