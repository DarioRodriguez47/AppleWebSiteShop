var express = require('express');
var router = express.Router();
var ProductoController = require('../controllers/producto.controller')
var AuthController = require('../controllers/auth.controller');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({uploadDir:'./uploads'});

//Pagina de inicio
router.get('/inicio',ProductoController.inicio);
//Guardar producto 
router.post('/guardar-producto', ProductoController.saveProducto);
//ver producto
router.get('/productos',ProductoController.getProductos);
//ver un producto
router.get('/producto/:id',ProductoController.getProducto);
//actualizar un producto
router.put('/producto/:id',ProductoController.updateProducto);
//eliminar un producto
router.delete('/producto/:id',ProductoController.deleteProducto);
//subir imagen
router.post('/subir-imagen/:id', multipartyMiddleware,ProductoController.uploadImage);
//recuperar imagen}
router.get('/get-imagen/:imagen',ProductoController.getImage);

// Registro de usuario
router.post('/register', AuthController.register);
// Inicio de sesión de usuario
router.post('/login', AuthController.login);

module.exports = router;
