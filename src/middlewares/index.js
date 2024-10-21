const genericMiddleware = require('./generic.middleware')
const fabricanteMiddleware = require('./fabricante.middleware')
const productoMiddleware = require('./producto.middleware')
const componenteMiddleware = require('./componente.middleware')

module.exports = { 
    genericMiddleware, 
    fabricanteMiddleware, 
    productoMiddleware, 
    componenteMiddleware
}