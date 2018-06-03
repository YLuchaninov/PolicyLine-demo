import apiRouter from './api';

export default (app) => {
    app.use('/api', apiRouter);
}