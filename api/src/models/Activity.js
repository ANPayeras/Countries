const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        dificultad: {
            type: DataTypes.INTEGER,
            unique: true
        },
        duracion: {
            type: DataTypes.STRING,
            unique: true
        },
        temporada: {
            type: DataTypes.ENUM,
            values: ['Verano', 'Otoño', 'Invierno', 'Primavera'],
            unique: true
        }
    });
};