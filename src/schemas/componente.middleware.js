const Joi = require('joi')
const componenteSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages( {
            "any.required":"el nombre es requerido",
            "string.min": "el nombre debe tener como mínimo {#limit} caracteres",
            "string.max": "el nombre debe tener como máximo {#limit} caracteres",
            "string.empty": "el nombre no puede ser vacio"
        }),
        descripcion: Joi.string().required().min(10).max(255).messages( {
            "any.required":"la descripcion es requerida",
            "string.min": "la descripcion debe tener como mínimo {#limit} caracteres",
            "string.max": "la descripcion debe tener como máximo {#limit} caracteres",
            "string.empty": "la descripcion no puede estar vacia"
        })
    
}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = componenteSchema