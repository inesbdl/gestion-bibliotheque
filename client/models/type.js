const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Types = db.define("types", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Types };