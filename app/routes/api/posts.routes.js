import PostController from '../../controllers/post.controller';
import {authorization, abac} from '../../middlewares';
import {
    getPostsPolicy,
    getDetailsPolicy,
    addPostPolicy,
    updatePostPolicy,
    deletePostPolicy
} from '../../middlewares/abac/policies';

export default (router) => {
    router.get('/posts',
        authorization('header'),
        abac(getPostsPolicy),
        PostController.getAll);

    router.get('/posts/:cuid',
        authorization('header'),
        abac(getDetailsPolicy),
        PostController.getPost);

    router.post('/posts',
        authorization('header'),
        abac(addPostPolicy),
        PostController.addPost);

    router.put('/posts/:cuid',
        authorization('header'),
        abac(updatePostPolicy),
        PostController.updatePost);

    router.delete('/posts/:cuid',
        authorization('header'),
        abac(deletePostPolicy),
        PostController.deletePost);
};