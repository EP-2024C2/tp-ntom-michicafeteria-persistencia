const Joi = require('joi')
const fabricanteSchema = Joi.object().keys(
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
        }),
        contacto: Joi.string().required().min(6).max(20).messages( {
            "any.required":"el contacto es requerido",
            "string.min": "el contactodebe tener como mínimo {#limit} caracteres",
            "string.max": "el contacto debe tener como máximo {#limit} caracteres",
            "string.empty": "el contacto no puede estar vacio"
        }),       
        pathImgPerfil: Joi.string().required().min(5).max(100).messages( {
            "any.required":"la ruta de la imagen es requerida",
            "string.min": "la ruta de la imagen debe tener como mínimo {#limit} caracteres",
            "string.max": "la ruta de la imagen debe tener como máximo {#limit} caracteres",
            "string.empty": "la ruta de la imagen no puede ser vacia"
        })

    
}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = fabricanteSchema