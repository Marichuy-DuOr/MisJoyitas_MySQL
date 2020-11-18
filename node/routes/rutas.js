const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

const { body, param, validationResult } = require('express-validator');

const crearToken = (user) => {
    let payload = {
        idUsuario: user.id,
        rol: user.rol,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
};

router.post('/login', (req, res) => {
    let correo = req.body.correo;
    user.getByCorreo(connection, correo, (data => {

        if (data.id.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrecta' });
        } else {
            const equals = bcrypt.compareSync(req.body.contrasena, data.id[0].contrasena);
            if (!equals) {
                return res.status(400).json({ message: 'Correo o contraseña incorrecta' });
            } else {
                res.json({
                    message: 'OK',
                    token: crearToken(data.id[0]),
                    idUsuario: data.id[0].id,
                    rol: data.id[0].rol,
                    nombre: data.id[0].nombre
                })
            }
        }
    }));

});

router.post('/register', (req, res) => {
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    req.body.is_active = 1;
    req.body.rol = 'client';
    let body = req.body;
    user.create(connection, body, (data => {
        res.json(data);
    }));
});

router.post('/registerDom', (req, res) => {
    let body = req.body;
    user.createDomicilio(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/municipio/:busqueda', [
    param('busqueda').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }

    let busqueda = req.params.busqueda;
    user.getMunicipio(connection, busqueda, (data => {
        res.json(data);
    }))
});

module.exports = router;