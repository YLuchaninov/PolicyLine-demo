const Jwt = require("jsonwebtoken");

module.exports = function verifyJWT(token, key) {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}