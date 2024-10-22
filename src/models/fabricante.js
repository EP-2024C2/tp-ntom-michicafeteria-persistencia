'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fabricante extends Model {
    static associate(models) {
      
      Fabricante.belongsToMany(models.Producto, { 
        through: 'ProductoFabricante',
        foreignKey: 'fabricanteId',
        otherKey: 'productoId',
        as: 'manyProducts' 
      });
    }
  }

  Fabricante.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contacto: DataTypes.STRING,
    pathImgPerfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fabricante',
  });

  return Fabricante;
};
