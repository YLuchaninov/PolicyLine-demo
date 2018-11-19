const bodyParser = require('body-parser');
const authorization = require('./authorization');
const extractor = require('./resourceExtractor');

const prefixMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
};

module.exports = {
    prefixMiddleware,
    authorization,
    extractor
}