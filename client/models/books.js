import { db } from './db';
import { DataTypes } from 'sequelize';

const Book = db.define("book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nbAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nbShared: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owned: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

export { Book };