import bodyParser from 'body-parser';
import authorization from './authorization';
import extractor from './resourceExtractor';

const prefixMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
};

export {
    prefixMiddleware,
    authorization,
    extractor
}