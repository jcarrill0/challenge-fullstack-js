import { DataTypes } from 'sequelize'; 
import db from '../db/connection'; 

const Income = db.define('Income', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        require: true, 
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        require: true,
    },
    userId: { 
        type: DataTypes.BIGINT, 
        field: 'user_id',
        unique: true, 
        references: {
          model: 'User',
          key: 'id'
        }
    },
},{
    tableName: 'income'
 });

Income.associate = models => {
    Income.belongsTo(models.User, {
        as: 'user',
        // foreignKey: 'id',
        // targetKey: 'userId'
    });
};

export default Income;