const { db } = require("./db.cjs");
const { DataTypes } = require("sequelize")

const Edition = db.define("editions", {
    edition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Edition };