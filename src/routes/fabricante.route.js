const { Router } = require('express');
const fabricanteController = require('../controllers/fabricante.controller');
const {fabricanteMiddleware} = require('../middlewares/fabricante.middlewares')

const route = Router();

route.get('/', fabricanteController.getAllFabricantes);
route.get('/:id', fabricanteController.getFabricanteById);
route.post('/', fabricanteController.createFabricante);
route.put('/:id', fabricanteController.updateFabricante);
route.delete('/:id', fabricanteController.deleteFabricante);
route.get('/:id/productos', fabricanteController.getProductosDeFabricante);

module.exports = route;
