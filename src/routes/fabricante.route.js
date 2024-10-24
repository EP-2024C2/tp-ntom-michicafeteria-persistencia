const { Router } = require('express');
const fabricanteController = require('../controllers/fabricante.controller');
const {fabricanteMiddleware} = require('../middlewares')
const fabricanteSchema = require('../schemas/fabricante.schema')
const schemaValidator = require('../schemas/schemaValidator')

const router = Router();

router.get('/fabricante', 
    fabricanteController.getAllFabricantes
);

router.get('/fabricante/:id',
    fabricanteMiddleware.validateIdFabricante, 
    fabricanteController.getFabricanteById
);

router.post('/fabricante', 
    schemaValidator(fabricanteSchema),
    fabricanteController.createFabricante
);

router.put('/fabricante/:id',
    fabricanteMiddleware.validateIdFabricante, 
    fabricanteController.updateFabricante
);

router.delete('/fabricante/:id', 
    fabricanteMiddleware.validateIdFabricante,
    fabricanteController.deleteFabricante
);

router.get('/fabricante/:id/productos',
    fabricanteMiddleware.validateIdFabricante, 
    fabricanteController.getFabricantesDeProducto
);

module.exports = router;
