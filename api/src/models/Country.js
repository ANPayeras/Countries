const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    flagimage: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    subRegion: {
      type: DataTypes.STRING,
      unique: true
    },
    area: {
      type: DataTypes.STRING,
      unique: true
    },
    population: {
      type: DataTypes.STRING,
      unique: true
    }
  });
};
