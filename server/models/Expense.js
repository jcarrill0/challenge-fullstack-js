import { DataTypes } from 'sequelize'; 
import db from '../db/connection'; 

const Expense = db.define('Expense', {
    description: {
        type: DataTypes.STRING,
        require: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        require: true, 
    },
    date: {
        type: DataTypes.DATE,
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
    categoryId: { 
        type: DataTypes.BIGINT, 
        field: 'category_id',
        unique: true, 
        references: {
          model: 'Category',
          key: 'id'
        }
    },
},{
    tableName: 'expense'
 });

Expense.associate = models => {
    Expense.belongsTo(models.User, {
        as: 'user', 
        // foreignKey: 'id',
        // targetKey: 'userId'
    });

    // Add categoryId key in the Expense table
    Expense.belongsTo(models.Category, {
        as: 'category', 
        // foreignKey: 'id',
        // targetKey: 'categoryId'
    });
};

export default Expense;