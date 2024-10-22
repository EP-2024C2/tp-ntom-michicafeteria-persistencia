const { Fabricante, Producto } = require('../models');
const { description } = require('../schemas/fabricante.schema');
const controller = {}

// Obtener todos los fabricantes (200)
const getAllFabricantes = async (req, res) => {
  const fabricantes = await Fabricante.findAll();
  console.log(fabricantes);
  res.status(200).json(fabricantes);
};

// Obtener un fabricante por ID (200,404)
const getFabricanteById = async (req, res) => {
  const  id  = req.params.id;
  const fabricante = await Fabricante.findByPk(id);
  res.status(200).json(fabricante);
};

// Crear un nuevo fabricante (201,400)
const createFabricante = async (req, res) => {
  const {nombre, direccion , contacto , pathImgPerfil} = req.body;
  const fabricante = await Fabricante.create({
    nombre,
    direccion,
    contacto,
    pathImgPerfil
  });
  res.status(201).json(fabricante);
};

// Modificar un fabricante existente (200,404)
const updateFabricante = async (req, res) => {
  const  {nombre, direccion,contacto , pathImgPerfil} = req.body;
  const id  = req.params.id;
  const fabricante = await Fabricante.findByPk(id);
  fabricante.nombre= nombre
  fabricante.direccion=direccion
  fabricante.contacto = contacto
  fabricante.pathImgPerfil= pathImgPerfil
  await Fabricante.save();
  res.status(200).json(fabricante);

};

// Borrar un fabricante (200,404,500)
const deleteFabricante = async (req, res) => {
  const idFabricante = req.params.id;
  
  try {
    const deleted = await Fabricante.destroy({where: {id:idFabricante}})

    res.status(200).json({ message: `Componente ${deleted} eliminado` });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el componente', error });
  }
};


// Obtener todos los productos de un fabricante (200,404)
const getProductosDeFabricante = async (req, res) => {
  const idFabricante = req.params.id;
  const productos = await Producto.findByPk( {where: {idFabricante},
    include: [{ model: Producto, as: 'productos' }]
  });
  res.status(200).json(productos);
  
};

controller.getAllFabricantes = getAllFabricantes;
controller.getFabricanteById = getFabricanteById;
controller.createFabricante = createFabricante;
controller.updateFabricante = updateFabricante;
controller.deleteFabricante = deleteFabricante;
controller.getProductosDeFabricante = getProductosDeFabricante;

module.exports = controller;