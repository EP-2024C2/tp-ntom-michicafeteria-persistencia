const express = require('express');
const router = express.Router();
const componenteController = require('../controllers/componente.controller');

router.get('/', componenteController.getAllComponentes);
router.get('/:id', componenteController.getComponenteById);
router.post('/', componenteController.createComponente);
router.put('/:id', componenteController.updateComponente);
router.delete('/:id', componenteController.deleteComponente);
router.get('/:id/productos', componenteController.getProductosDeComponente);

module.exports = router;
