'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fabricante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fabricante.hasMany(models.Producto,{
        foreignKey: 'fabricanteId',
        as: 'manufacturer'
      })
      Fabricante.belongsToMany(models.Producto, { 
        through: 'ProductoFabricante',
        foreignKey: 'fabricanteId',
        otherKey: 'productoId',
        as: 'manyProducts' });
    }
  }
  Fabricante.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contacto: DataTypes.STRING,
    pathImgPerfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fabricantes',
    tableName: 'Fabricantes' ,
    timestamps: false
  });
  return Fabricante;
};