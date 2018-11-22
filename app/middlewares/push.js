const policyController = require('../abac/json');
const env = require('../abac/env');

const pushMiddleware = (params) => {
    const pushPolicy = policyController('getPosts');

    return async (req, res, next) => {
        try {
            req.pushNotification = (data)=>{
                data = {
                    env,
                    resource: data.payload
                };
                const userFilter = pushPolicy().getWatchers(data);
                console.log(JSON.stringify(userFilter, null, 2));
            };
            next();
        } catch (e) {
            console.log(e);
            next();
        }
    };
};

module.exports = pushMiddleware;