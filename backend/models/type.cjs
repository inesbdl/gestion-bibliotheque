const { db } = require("./db.cjs");
const { DataTypes } = require("sequelize")

const Type = db.define("types", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Type };