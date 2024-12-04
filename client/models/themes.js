import { db } from './db';
import { DataTypes } from 'sequelize';

const Theme = db.define("themes", {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

export { Theme };