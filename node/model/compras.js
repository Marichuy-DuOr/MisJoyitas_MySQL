module.exports = {

    createProveedor: (connection, body, callback) => {
        connection.query('insert into proveedor SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    updateProveedor: (connection, body, callback) => {
        connection.query('update proveedor set nombre = ?, correo = ?, telefono = ? WHERE id = ? ', [body.nombre, body.correo, body.telefono, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    activarProveedor: (connection, body, callback) => {
        connection.query('update proveedor set is_active = ? WHERE id = ? ', [body.is_active, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getProveedor: (connection, busqueda, callback) => {
        connection.query(`select id, nombre, correo, telefono from proveedor where nombre LIKE '%${busqueda}%' and is_active=1 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getNombreProveedor: (connection, busqueda, callback) => {
        connection.query(`select id, nombre from proveedor where nombre LIKE '%${busqueda}%' and is_active=1 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProveedores: (connection, callback) => {
        connection.query(`select id, nombre, correo, telefono from proveedor where is_active = 1`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProveedoresInactivos: (connection, callback) => {
        connection.query(`select id, nombre from proveedor where is_active = 0 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getNombreProducto: (connection, busqueda, callback) => {
        connection.query(`select id, nombre from producto where nombre LIKE '%${busqueda}%' and is_active=1 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    createProveedorProducto: (connection, body, callback) => {
        connection.query('insert into proveedor_producto SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getProductosPorProveedor: (connection, id_proveedor, callback) => {
        connection.query(`select b.id, a.nombre, b.id_producto, a.imagen, a.existencia, b.precio_compra from producto a, proveedor_producto b where b.id_proveedor = '${id_proveedor}' and b.id_producto=a.id and a.is_active=1`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductosPorProveedorMinimo: (connection, id_proveedor, callback) => {
        connection.query(`select b.id, a.nombre, b.id_producto, a.imagen, a.existencia, b.precio_compra from producto a, proveedor_producto b where b.id_proveedor = '${id_proveedor}' and b.id_producto=a.id and a.is_active=1 and a.existencia < a.minimo`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    buscarProductosPorProveedor: (connection, params, callback) => {
        connection.query(`select b.id, b.id_producto, a.nombre, a.imagen, a.existencia, b.precio_compra from producto a, proveedor_producto b where b.id_proveedor = '${params.id}' and b.id_producto=a.id and a.is_active=1 and a.nombre like '%${params.busqueda}%'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getPrecioCompra: (connection, params, callback) => {
        connection.query(`select id, precio_compra from proveedor_producto where id_proveedor = '${params.id_proveedor}' and id_producto='${params.id_producto}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    updatePrecioCompra: (connection, body, callback) => {
        connection.query('update proveedor_producto set precio_compra = ? WHERE id = ? ', [body.precio_compra, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    deleteProveedorProducto: (connection, id, callback) => {
        connection.query(`delete from proveedor_producto where id = '${id}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        })
    },

    createCompra: (connection, body, callback) => {
        connection.query('insert into compras (id_proveedor, fecha, total) values (?,now(),?)', [body.id_proveedor, body.total], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    createProductoCompra: (connection, body, callback) => {
        connection.query('insert into producto_compras SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    updateExistencia: (connection, body, callback) => {
        connection.query('update producto set existencia = existencia + ? where id = ?', [body.cantidad, body.id_producto], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getCompras: (connection, callback) => {
        connection.query(`select c.id, p.nombre as proveedor, c.fecha, c.total from compras c, proveedor p where c.id_proveedor = p.id limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasPorFechas: (connection, params, callback) => {
        connection.query(`select c.id, p.nombre as proveedor, c.fecha, c.total from compras c, proveedor p where c.id_proveedor = p.id and c.fecha between '${params.f1}' and '${params.f2}' limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductoCompras: (connection, id_compra, callback) => {
        connection.query(`select p.nombre, p.imagen, c.cantidad, c.precio, c.precio*c.cantidad as total from producto p, producto_compras c where c.id_producto=p.id and c.id_compra = ${id_compra}`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasProveedorPorMes: (connection, params, callback) => {
        connection.query(`select p.nombre as proveedor, count(c.id_proveedor) as no_compras from proveedor p, compras c where p.id=c.id_proveedor and month(c.fecha) = ${params.mes} and year(c.fecha)=${params.anio} group by p.id`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },
}