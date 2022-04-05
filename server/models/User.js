import { DataTypes } from 'sequelize'; 
import db from '../db/connection'; 

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        require: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true, 
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    tableName: 'user'
 });

User.associate = models => {
    User.hasMany(models.Income, {
        foreignKey: 'userId',
        as: 'incomes'
    });

    User.hasMany(models.Expense, {
        foreignKey: 'userId',
        as: 'expenses'
    });
};

export default User;