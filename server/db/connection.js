import { Sequelize } from 'sequelize';
import { 
    username, 
    password, 
    database, 
    host, 
    dialect 
} from '../config/config';


const db = new Sequelize(database, username, password, {
    host,
    dialect,
    // logging: false,
});

export default db;