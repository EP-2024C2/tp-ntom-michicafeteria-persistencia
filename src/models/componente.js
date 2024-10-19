'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Componente.belongsToMany(models.Producto,{
        through: 'ProductoComponente',
        foreignKey: 'componenteId',
        otherKey: 'productoId',
        as : 'manyProducts'
      })
    }
  }
  Componente.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Componentes',
    tableName: 'Componentes',
    timestamps: false
  });
  return Componente;
};