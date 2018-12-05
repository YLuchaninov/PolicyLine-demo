const apiRouter = require('./api');

module.exports = app => {
    app.use('/api', apiRouter);
};