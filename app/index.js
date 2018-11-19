const express = require('express');

const config = require('./config');
const { prefixMiddleware } = require('./middlewares');
const connectToDb = require('./config/dbConnect');
const initRouters = require('./routes');

const app = express();
prefixMiddleware(app);

connectToDb().then(() => {
    initRouters(app);

    // start server
    app.listen(config.server.port, () => {
        console.log(`app started at http://${config.server.host}:${config.server.port}/`);
    });
}).catch((err) => {
    console.error(err);
});