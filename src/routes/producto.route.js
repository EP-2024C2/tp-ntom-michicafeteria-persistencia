const { Router } = require('express');
const productoController = require('../controllers/producto.controller')
const productoMiddleware = require('../middlewares/producto.middleware')
const productoSchema = require('../schemas/producto.schema')

const schemaValidator = require('../middlewares/schemaValidator.middleware');

const fabricanteController = require('../controllers/fabricante.controller');
const fabricanteSchema = require('../schemas/fabricante.schema')

const componenteController = require('../controllers/componente.controller');

const router = Router();

router.get('/producto', 
    productoController.getAllProductos
);

router.get('/producto/:id', 
    productoMiddleware.validateIdProducto,
    productoController.getProductoById
);

router.post('/producto',
    schemaValidator(productoSchema),
    productoController.createProducto
);

router.put('/producto/:id',
    productoMiddleware.validateIdProducto, 
    productoController.updateProducto
);

router.delete('/producto/:id', 
    productoMiddleware.validateIdProducto,
    productoController.deleteProducto
);

router.post('/producto/:id/fabricantes',
    productoMiddleware.validateIdProducto,
    schemaValidator(fabricanteSchema),
    fabricanteController.createFabricanteAsociacion
);

router.get('/producto/:id/fabricantes', 
    productoMiddleware.validateIdProducto,
    fabricanteController.getFabricantesDeProducto
);

router.post('/producto/:id/componentes',
    productoMiddleware.validateIdProducto,
    schemaValidator(productoSchema),
    componenteController.createComponenteAsociacion
);

router.get('/producto/:id/componentes',
    productoMiddleware.validateIdProducto,
    componenteController.getComponentesDeProducto
);

module.exports = router;
