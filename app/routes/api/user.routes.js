const UserController = require('../../controllers/user.controller');
const { identification } = require("../../middlewares");

module.exports = (router) => {
    // create user
    router.post('/user',
        UserController.create);

    // login
    router.post('/user/login',
        UserController.login);

    router.post('/user/delete',
        identification('header'),
        UserController.delete);
};