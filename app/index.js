import express from 'express';

import config from './config';
import {prefixMiddleware} from './middlewares';
import connectToDb from './config/dbConnect';
import initRouters from './routes';

const app = express();
prefixMiddleware(app);

connectToDb().then(() => {
    initRouters(app);

    // start server
    app.listen(config.server.port, () => {
        console.log('app started at http://localhost:3000/');
    });
}).catch((err) => {
    console.error(err);
});