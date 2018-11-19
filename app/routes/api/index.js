const { Router } = require('express');

const setupPostRoutes = require('./posts.routes');
const setupUserRoutes = require('./user.routes');

const apiRouter = new Router();

setupPostRoutes(apiRouter);
setupUserRoutes(apiRouter);

module.exports = apiRouter;