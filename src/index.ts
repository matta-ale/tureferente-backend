import express from "express";
import router from './routes';

const server = express();
const port = 3001;

server.use('/', router);

server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );