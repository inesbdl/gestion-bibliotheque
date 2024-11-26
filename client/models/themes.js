const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Theme = db.define("themes", {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Theme };