const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Edition = db.define("editions", {
    edition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Edition };