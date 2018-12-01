const User = require('../models/user');
const policyController = require('../abac/json');
const env = require('../abac/env');

const pushPolicy = policyController('getPosts');

module.exports = async (data)=>{
    pushPolicy().check({
        action: {},
        env,
        resource: data
    });
    const userFilter = pushPolicy().getWatchers();

    try {
        const users = await User.find(userFilter);
        console.log(users);

        // todo push
    } catch (e) {
        console.warn(e);
    }
};