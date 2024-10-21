'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
    static associate(models) {
      Componente.belongsToMany(models.Producto, {
        through: 'ProductoComponente',
        foreignKey: 'componenteId',
        as: 'manyProducts',
      });
    }
  }

  Componente.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Componente', // Cambiado de 'Componentes' a 'Componente'
      tableName: 'Componentes',
    }
  );
  return Componente;
};
