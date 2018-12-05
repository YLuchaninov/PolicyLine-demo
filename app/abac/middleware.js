const env = require('./env');
const statuses = require('../config/statuses');

module.exports = policyGetter => {

  return async (req, res, next) => {

    const policy = (typeof policyGetter === 'function') ? policyGetter() : policyGetter;
    const user = req.user;
    const action = {};

    try {
      const access = policy.check({
        user,
        action,
        env
      });

      const condition = policy.getConditions(req.resource);

      if (access && condition) {
        req.condition = condition;
        next();
      } else {
        return res.status(401).send(statuses[401]);
      }
    } catch (e) {
      return res.status(406).send(e);
    }
  };
};