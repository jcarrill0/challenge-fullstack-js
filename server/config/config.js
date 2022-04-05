import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    // Conexion
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'budgetdb',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',

    // Configure seeds
    seederStorage: 'sequelize',
    seederStorageTableName: 'seeds',

    // Configure migrations
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'migrations',

    // define: {
    //     timestamps: false,
    //     underscored: true
    // }
}