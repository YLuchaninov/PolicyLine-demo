const express = require('express');

const config = require('./config');
const { prefixMiddleware } = require('./middlewares');
const connectToDb = require('./config/dbConnect');
const initRouters = require('./routes');

const app = express();
prefixMiddleware(app);

connectToDb().then(() => {
    initRouters(app);

    app.use((req, res, next) => {
        next();
    })

    // start server
    app.listen(config.server.port, () => {
        console.log(app);
        console.log('app started at http://localhost:3000/');
    });
}).catch((err) => {
    console.error(err);
});