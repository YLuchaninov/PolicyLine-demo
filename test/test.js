// general user testing: create user, login, delete user
require('./tests/generalUser.js');

const DIContainer = {};

// create users, admins & superadmin for all companies
// require('./tests/beforeAll').inject(DIContainer);

// Attribute Based Access Control
// 7 roles x 5 API endpoints

// require('./tests/createPost').inject(DIContainer);
// require('./tests/getPosts').inject(DIContainer);
// require('./tests/updatePost').inject(DIContainer);
// require('./tests/getDetails').inject(DIContainer);
// require('./tests/deletePost').inject(DIContainer);

// delete test users & test posts
// require('./tests/endAll').inject(DIContainer);