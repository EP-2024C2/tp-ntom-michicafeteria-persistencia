const { Componente } = require('../models')
const middleware = {}
const validateIdComponente = async (req, res, next)=>{
    const id = req.params.id
    const componente = await Componente.findByPk(id)
    console.log(componente)
    if (!componente)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middleware.validateIdComponente = validateIdComponente


module.exports = middleware

