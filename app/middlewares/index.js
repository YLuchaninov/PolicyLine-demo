const bodyParser = require('body-parser');
const identification = require('./identification');
const extractor = require('./resourceExtractor');

const prefixMiddleware = app => {
    app.use(bodyParser.json());
};

module.exports = {
    prefixMiddleware,
    identification,
    extractor
};