import UserController from '../../controllers/user.controller';
import {authorization} from "../../middlewares";

export default (router) => {
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