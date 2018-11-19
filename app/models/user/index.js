const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    cuid: {
        type: 'String',
        unique: true,
        required: true
    },

    location: {
        type: { type: 'String' },
        coordinates: ['Number']
    },

    company: {
        type: 'String'
    },

    age: {
        type: 'Number',
        default: 8
    },

    role: {
        type: 'String',
        default: 'user'
    }

});
userSchema.plugin(uniqueValidator);
userSchema.index({ "location": "2dsphere" });

const User = mongoose.model('User', userSchema);

module.exports = User;