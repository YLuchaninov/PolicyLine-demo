import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },

    content: {
        type: 'String',
        required: true
    },

    tags: {
        type: ['String'],
        default: [],
        required: true
    },

    location: {
        type: {type: 'String'},
        coordinates: ['Number']
    },

    created: {
        type: 'Date',
        default: Date.now,
        required: true
    },

    author: {
        type: 'String',
        required: false
    },

    cuid: {
        type: 'String',
        unique: true,
        required: true
    },

    company: {
        type: 'String'
    },

    category: {
        type: 'String',
        enum: ['private', 'inner', 'public'],
        default: 'public'
    }
});

postSchema.index({"location": "2dsphere"});
postSchema.plugin(uniqueValidator);

const Post = mongoose.model('Post', postSchema);

export default Post;