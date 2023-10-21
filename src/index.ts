import express from "express";
import router from './routes';
import dotenv from 'dotenv'

dotenv.config()
const server = express();

server.use('/', router);

server.listen( process.env.PORT, () => {
    console.log( `server started at ${ process.env.BACK_HOST }${ process.env.PORT }` );
} );