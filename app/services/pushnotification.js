const User = require('../models/user');
const policyController = require('../abac/json');
const env = require('../abac/env');

const pushPolicy = policyController('getPosts');

module.exports = async (data)=>{
    data = {
        env,
        resource: data.payload
    };
    const userFilter = pushPolicy().getWatchers(data);
    userFilter['$or'] = userFilter['$or'].slice(1, 3); // todo fix dirty hack

    console.log(JSON.stringify(userFilter['$or'], null, 2));

    try {
        const users = await User.find(userFilter);
        console.log(users);

        // todo push
    } catch (e) {
        console.warn(e);
    }
};