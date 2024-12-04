import { db } from './db';
import { DataTypes } from 'sequelize';

const Edition = db.define("editions", {
    edition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

export { Edition };