import cuid from 'cuid';
import {selectorBuilder, limitBuilder} from '../helpers/queryBuilder';
import Post from '../models/post';
import statuses from '../config/statuses';

const PostController = {};

PostController.addPost = async (req, res) => {
    try {
        const rawPost = req.body.post;
        rawPost.author = req.user.cuid;
        rawPost.cuid = cuid();
        rawPost.location = {
            type: 'Point',
            coordinates: req.body.post.location
        };

        const newPost = new Post(rawPost);
        const post = await newPost.save();
        return res.json({post});
    } catch (e) {
        res.status(500).send(e);
    }
};

PostController.getPost = async (req, res) => {
    try {
        const post = await Post.findOne({cuid: req.params.cuid}).exec();
        return res.json({post});
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
        const post = await Post.findOne({cuid: req.params.cuid}).exec();

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
            return res.json({post: saved});
        }
        return res.status(404).send(statuses[404]);
    } catch (e) {
        return res.status(500).send(e);
    }
};

PostController.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({cuid: req.params.cuid}).exec();
        if (!post) {
            return res.status(403).send(statuses[403]);
        }
        await post.remove();
        return res.status(200).send(statuses[200]);
    } catch (e) {
        return res.status(500).send(e);
    }
};

export default PostController;