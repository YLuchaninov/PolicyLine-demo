const verifyJWT = require('../utils/verifyJWT');
const User = require("../models/user");
const config = require("../config");

const privateKey = config.key.privateKey;

const auth = (type) => {
    return async (req, res, next) => {
        try {
            let token = req.body ? req.body.token : '';
            if (type === 'header') {
                const header = req.headers['authorization'];
                token = header ? (header.trim().split(' '))[1] : '';
            }

            if (token.length) {
                const decoded = await verifyJWT(token, privateKey);
                req.user = await User.findOne({ username: decoded.username, cuid: decoded.id });
            }

            next();
        } catch (e) {
            return res.status(406).send(e);
        }
    };
};

module.exports = auth;