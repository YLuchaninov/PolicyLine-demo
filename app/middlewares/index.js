import bodyParser from 'body-parser';
import authorization from './authorization';
import abac from './abac';

const prefixMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
};

export {
    abac,
    prefixMiddleware,
    authorization
}