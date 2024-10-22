'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      
      Producto.belongsToMany(models.Componente, {
        through: 'ProductoComponente', 
        foreignKey: 'productoId',
        otherKey: 'componenteId',
        as: 'manyComponents', 
      });

      
      Producto.belongsToMany(models.Fabricante, {
        through: 'ProductoFabricante', 
        foreignKey: 'productoId',
        otherKey: 'fabricanteId',
        as: 'manyManufacturers' 
      });
    }
  }

  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    pathImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Producto',
  });

  return Producto;
};
