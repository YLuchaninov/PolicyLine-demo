const Jwt = require('jsonwebtoken');
const cuid = require('cuid');
const User = require('../models/user');
const config = require('../config');
const { decrypt, encrypt } = require('../utils/crypto');
const statuses = require('../config/statuses');

const privateKey = config.key.privateKey;

const UserController = {};

UserController.create = (req, res)=>{
    return res.status(500).send({});
};
//     async (req, res) => {
//     console.log(req, res);
//     return res.status(500).send({});
//     try {
//         const body = req.body;
//
//         body.password = encrypt(req.body.password);
//         body.cuid = cuid();
//         body.location = {
//             type: 'Point',
//             coordinates: body.location
//         };
//
//         await User.create(body);
//         return res.status(200).send(statuses[200]);
//     } catch (e) {
//         return res.status(500).send(e);
//     }
// };

UserController.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(422).send(statuses[422]);
        }
        if (req.body.password !== decrypt(user.password)) {
            return res.status(401).send(statuses[401]);
        }

        const tokenData = {
            username: user.username,
            id: user.cuid
        };
        const result = {
            username: user.username,
            token: Jwt.sign(tokenData, privateKey)
        };

        return res.json(result);
    } catch (e) {
        return res.status(500).send(e);
    }
};

UserController.delete = async (req, res) => {
    try {
        await req.user.remove();
        return res.json({ message: `user deleted successfully` });
    } catch (e) {
        return res.status(500).send(e);
    }
};

module.exports = UserController;