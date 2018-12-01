const cuid = require('cuid');
const { selectorBuilder, limitBuilder } = require('../helpers/queryBuilder');
const Post = require('../models/post');
const statuses = require('../config/statuses');
const { pushNotification } = require('../services');

const PostController = {};

PostController.addPost = async (req, res) => {
    try {
        const rawPost = req.body.post;
        rawPost.author = req.user.cuid;
        rawPost.company = req.user.company;
        rawPost.cuid = cuid();
        rawPost.location = {
            type: 'Point',
            coordinates: req.body.post.location
        };

        const newPost = new Post(rawPost);
        const post = await newPost.save();

        pushNotification(post.toJSON());

        return res.json({ post });
    } catch (e) {
        res.status(500).send(e);
    }
};

PostController.getPost = async (req, res) => {
    try {
        const post = await Post.findOne(req.condition).exec();
        return res.json({ post });
    } catch (e) {
        return res.status(500).send(e);
    }
};

PostController.getAll = async (req, res) => {
    try {
        const [page, limit] = limitBuilder(req.query);
        const query = Post.find(selectorBuilder(req.query));
        return res.json({
            posts: await query.sort('-created').limit(limit).skip(limit * page).exec(),
            total: await query.count(),
            page,
            limit
        });
    } catch (err) {
        return res.status(500).send(err);
    }
};

PostController.updatePost = async (req, res) => {
    try {
        const post = await Post.findOne(req.condition).exec();

        if (post) {
            post.title = req.body.post.title || post.title;
            post.abstract = req.body.post.abstract || post.abstract;
            post.content = req.body.post.content || post.content;
            post.tags = req.body.post.tags || post.tags;
            const newLocation = {
                type: 'Point',
                coordinates: req.body.post.location
            };
            post.location = (req.body.post.location) ? newLocation : post.location;

            const saved = await post.save();
            return res.json({ post: saved });
        }
        return res.status(404).send(statuses[404]);
    } catch (e) {
        return res.status(500).send(e);
    }
};

PostController.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne(req.condition).exec();
        if (!post) {
            return res.status(403).send(statuses[403]);
        }
        await post.remove();
        return res.status(200).send(statuses[200]);
    } catch (e) {
        return res.status(500).send(e);
    }
};

module.exports = PostController;