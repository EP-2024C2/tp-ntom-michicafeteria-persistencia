'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      
      Producto.belongsToMany(models.Componente, {
        through: 'ProductoComponente'
      });

      
      Producto.belongsToMany(models.Fabricante, {
        through: 'ProductoFabricante'
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
    tableName: 'Productos',
    timestamps: false
  });

  return Producto;
};
