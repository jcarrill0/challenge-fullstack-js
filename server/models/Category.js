import { DataTypes } from 'sequelize'; 
import db from '../db/connection'; 

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
},{
    tableName: 'category'
 });

// Add categoryId key in the Expenses table
Category.associate = models => {
    Category.hasMany(models.Expense, {
        foreignKey: 'categoryId',
        as: 'expenses'
    });
};

export default Category;