const PostController = require('../../controllers/post.controller');
const { identification, extractor } = require('../../middlewares');
const abac = require('../../abac/middleware');
const policyController = require('../../abac/json');

// description, how to get resources & what we need
// only for demo, you can implement it by any ways
// It also could be implemented by middleware
const resourceRules = { cuid: 'params.cuid' };

// Important: for future, you need to add validation middleware
module.exports = (router) => {
    router.get('/posts',
        identification('header'),
        abac(policyController('getPosts')),
        PostController.getAll);

    router.get('/posts/:cuid',
        identification('header'),
        extractor(resourceRules),
        abac(policyController('getDetails')),
        PostController.getPost);

    router.post('/posts',
        identification('header'),
        abac(policyController('addPost')),
        PostController.addPost);

    router.put('/posts/:cuid',
        identification('header'),
        extractor(resourceRules),
        abac(policyController('updatePost')),
        PostController.updatePost);

    router.delete('/posts/:cuid',
        identification('header'),
        extractor(resourceRules),
        abac(policyController('deletePost')),
        PostController.deletePost);
};