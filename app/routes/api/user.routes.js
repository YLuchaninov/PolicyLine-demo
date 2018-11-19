const UserController = require('../../controllers/user.controller');
const { authorization } = require("../../middlewares");

module.exports = (router) => {
    // create user
    router.post('/user',
        UserController.create);

    // login
    router.post('/user/login',
        UserController.login);

    router.post('/user/delete',
        authorization('header'),
        UserController.delete);
};