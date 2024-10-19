const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);
router.post('/:id/fabricantes', productoController.createFabricanteAsociacion);
router.get('/:id/fabricantes', productoController.getFabricantesDeProducto);
router.post('/:id/componentes', productoController.createComponenteAsociacion);
router.get('/:id/componentes', productoController.getComponentesDeProducto);

module.exports = router;
