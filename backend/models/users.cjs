const { db } = require("./db.cjs");
const { DataTypes } = require("sequelize")

const User = db.define("users", {
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { },
        }
    }
});

module.exports = { User };