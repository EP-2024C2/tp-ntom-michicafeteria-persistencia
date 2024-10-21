const { Fabricante, Producto } = require('../models');
const controller = {}

// Obtener todos los fabricantes (200)
const getAllFabricantes = async (req, res) => {
  const fabricantes = await Fabricante.findAll();
  res.status(200).json(fabricantes);
};

// Obtener un fabricante por ID (200,404)
const getFabricanteById = async (req, res) => {
  const  id  = req.params;
  const fabricante = await Fabricante.findByPk(id);
  if (fabricante) 
    res.status(200).json(fabricante);
};

// Crear un nuevo fabricante (201,400)
const createFabricante = async (req, res) => {
  const {nombre, direccion , contacto , pathImgPerfil} = req.body; //{nombre, direccion,contacto , pathImgPerfil}
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
  const { id } = req.params;
    const [updated] = await Fabricante.update(req.body, { where: { id } });
    if (updated) {
      const updatedFabricante = await Fabricante.findByPk(id);
      res.status(200).json(updatedFabricante);
    }
};

// Borrar un fabricante (200,404,500)
const deleteFabricante = async (req, res) => {
  const idFabricante = req.params.id;
  const deleted = await Fabricante.destroy({where: {id:idFabricante}})
  if (deleted) {
    res.status(200).json({ message: 'Fabricante eliminado' });
  } else {
    res.status(500).json({ message: 'Error al eliminar el fabricante', error });
  }
};

// Obtener todos los productos de un fabricante (200,404)
const getProductosDeFabricante = async (req, res) => {
  const { id } = req.params;
  try {
    const fabricante = await Fabricante.findByPk(id, {
      include: [{ model: Producto, as: 'manyProducts' }]
    })
    if (fabricante) 
      res.status(200).json(fabricante.manyProducts);
    
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos del fabricante', error });
  }'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.hasMany(models.Componente,{
        foreignKey:'productosId' ,
        as:'products'
      })
      Producto.belongsToMany(models.Fabricante, { 
        through: 'ProductoFabricante',
        foreignKey: 'productoId',
        otherKey: 'fabricanteId' });

      Producto.belongsToMany(models.Componente, { 
        through: 'ProductoComponente',
        foreignKey: 'productoId',
        otherKey: 'componenteId',
        as: 'manyComponents' })
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    pathImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'Productos'
  });
  return Producto;
};
};

controller.getAllFabricantes = getAllFabricantes;
controller.getFabricanteById = getFabricanteById;
controller.createFabricante = createFabricante;
controller.updateFabricante = updateFabricante;
controller.deleteFabricante = deleteFabricante;
controller.getProductosDeFabricante = getProductosDeFabricante;

module.exports = controller;