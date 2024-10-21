const { Router } = require('express');

const componenteController = require('../controllers/componente.controller');
const {componenteMiddleware} = require('../middlewares');
const componenteSchema = require('../schemas/componente.schema');

const schemaValidator = require('../middlewares/schemaValidator.middleware');

const productoController = require('../controllers/producto.controller');

const router = Router();

router.get('/componente', 
    componenteController.getAllComponentes);

router.get('/componente/:id',
    componenteMiddleware.validateIdComponente, 
    componenteController.getComponenteById
);

router.post('/componente',
    schemaValidator(componenteSchema),
    componenteController.createComponente
);

router.put('/componente/:id',
    componenteMiddleware.validateIdComponente,
    componenteController.updateComponente
);

router.delete('/componente/:id', 
    componenteMiddleware.validateIdComponente,
    componenteController.deleteComponente
);

router.get('/componente/:id/productos', 
    componenteMiddleware.validateIdComponente, 
    productoController.getProductosDeComponente
);

module.exports = router;
