import UserController from '../../controllers/user.controller';

export default (router) => {
    // create user
    router.post('/user',
        UserController.create);

    // login
    router.post('/user/login',
        UserController.login);
};