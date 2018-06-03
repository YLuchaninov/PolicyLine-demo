import verifyJWT from '../utils/verifyJWT';
import User from "../models/user";
import config from "../config";

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
                req.user = await User.findOne({username: decoded.username, cuid: decoded.id});
            }

            next();
        } catch (e) {
            return res.status(500).send(e);
        }
    };
};

export default auth;