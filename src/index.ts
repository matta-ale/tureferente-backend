import express from "express";
import router from './routes';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const server = express();

server.use(cors())
server.use('/', router);

server.listen( process.env.PORT, () => {
    console.log( `server started at ${ process.env.BACK_HOST }${ process.env.PORT }` );
} );