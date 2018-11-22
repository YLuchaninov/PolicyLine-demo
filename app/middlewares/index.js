const bodyParser = require('body-parser');
const identification = require('./identification');
const extractor = require('./resourceExtractor');
const pushMiddleware = require('./push');

const prefixMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(pushMiddleware());
};

module.exports = {
    prefixMiddleware,
    identification,
    extractor
}