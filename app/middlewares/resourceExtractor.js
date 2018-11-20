function resourceExtractor(req, rules) {
    const result = {};
    let namespace;

    for (let key in rules) {
        namespace = rules[key].split('.');
        result[key] = req[namespace[0]][namespace[1]];
    }
    return result;
}

const extractor = (resourceRules) => {

    return async (req, res, next) => {
        try {
            req.resource = resourceExtractor(req, resourceRules);
            next();
        } catch (e) {
            return res.status(500).send(e);
        }
    };
};

module.exports = extractor;