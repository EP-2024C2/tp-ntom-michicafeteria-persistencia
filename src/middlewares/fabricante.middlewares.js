const { Fabricante } = require('../models')
const middleware = {}
const validateIdFabricante = async (req, res, next)=>{
    const id = req.params.id
    const fabricante = await Fabricante.findByPk(id)
    console.log(fabricante)
    if (!fabricante)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middleware.validateIdFabricante = validateIdFabricante


module.exports = middleware

