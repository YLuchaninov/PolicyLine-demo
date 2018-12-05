const {promisify} = require('util');
const Jwt = require("jsonwebtoken");

module.exports = promisify(Jwt.verify);