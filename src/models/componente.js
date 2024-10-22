'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
    static associate(models) {
      
      Componente.belongsToMany(models.Producto, {
        through: 'ProductoComponente'
      });
    }
  }

  Componente.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Componente',
    tableName: 'Componentes',
    timestamps: false
  });

  return Componente;
};
