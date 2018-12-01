const User = require('../models/user');
const policyController = require('../abac/json');
const env = require('../abac/env');

const pushPolicy = policyController('getPosts');

module.exports = async (data) => {

  const result = pushPolicy().check({
    action: {},
    env,
    resource: data
  });

  if (result) {
    const userFilter = pushPolicy().getConditions();

    try {
      const users = await User.find(userFilter);

      console.log('\n\n push notification for users:\n');
      console.log(users);

      // todo push
    } catch (e) {
      console.warn(e);
    }
  }
};