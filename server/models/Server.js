import express, { json } from 'express';
import cors from 'cors';

import db from '../db/connection';
import usersRoute from '../routes/users'
import authRoute from '../routes/auth'
import incomesRoute from '../routes/incomes'
import expensesRoute from '../routes/expenses'
import categoriesRoute from '../routes/categories'


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';  
        this.paths = {
            auth:           '/api/auth',
            users:          '/api/users',
            incomes:        '/api/incomes',
            expenses:       '/api/expenses',
            categories:     '/api/categories',
        };

        // Conexion a DB
        this.conectarDB();

        //Middlewares
        this.middlewares();                    

        // Rutas de mi aplicación 
        this.routes();
    }

    async conectarDB() {
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            throw new Error( error );
            // console.error('Unable to connect to the database:', error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(json());

        // Directorio público
        this.app.use(express.static('public'));

        // Fileupload - carga de archivos
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));
    }

    routes() {
        const { users, auth, incomes, expenses, categories } = this.paths

        this.app.use(auth, authRoute);
        this.app.use(users, usersRoute);   
        this.app.use(incomes, incomesRoute);   
        this.app.use(expenses, expensesRoute);   
        this.app.use(categories, categoriesRoute);   
    }
 
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run a port: ', this.port);
        });
    }
}

export default Server;