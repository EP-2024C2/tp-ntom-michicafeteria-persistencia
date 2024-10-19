'use strict';
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
    modelName: 'Productos',
    tableName: 'Productos',
    timestamps: false
  });
  return Producto;
};