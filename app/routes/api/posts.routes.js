import PostController from '../../controllers/post.controller';
import {authorization, extractor} from '../../middlewares';
import abac from '../../abac/middleware';
import policyController from '../../abac/json';

// description, how to get resources & what we need
// only for demo, you can implement it by any ways
// It also could be implemented by middleware
const resourceRules = {cuid: 'params.cuid'};

// Important: for future, you need to add validation middleware
export default (router) => {
    router.get('/posts',
        authorization('header'),
        abac(policyController('getPosts')),
        PostController.getAll);

    router.get('/posts/:cuid',
        authorization('header'),
        extractor(resourceRules),
        abac(policyController('getDetails')),
        PostController.getPost);

    router.post('/posts',
        authorization('header'),
        abac(policyController('addPost')),
        PostController.addPost);

    router.put('/posts/:cuid',
        authorization('header'),
        extractor(resourceRules),
        abac(policyController('updatePost')),
        PostController.updatePost);

    router.delete('/posts/:cuid',
        authorization('header'),
        extractor(resourceRules),
        abac(policyController('deletePost')),
        PostController.deletePost);
};