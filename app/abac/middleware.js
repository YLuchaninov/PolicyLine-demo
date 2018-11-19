const env  = require('./env');
const statuses  = require('../config/statuses');

const abac = (policyGetter) => {

    return async (req, res, next) => {
        const policy = (typeof policyGetter === 'function') ? policyGetter() : policyGetter;
        const user = req.user;
        const action = null;

        try {
            const access = policy.check({
                user,
                action,
                env: env.toObject(),
                resource: req.resource
            });

            const condition = policy.getConditions();

            if (access && condition) {
                req.condition = condition;
                next();
            } else {
                return res.status(401).send(statuses[401]);
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    };
};

module.exports = abac;