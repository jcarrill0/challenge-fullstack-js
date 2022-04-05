import dotenv from 'dotenv'
import Server from './models/Server';

dotenv.config();

// Configurar dot.env
const server = new Server();

server.listen();