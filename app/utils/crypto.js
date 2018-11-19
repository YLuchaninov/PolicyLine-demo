const crypto = require('crypto');
const config = require('../config');

const algorithm = 'aes-256-ctr';
const privateKey = config.key.privateKey;

function decrypt(password) {
    const decipher = crypto.createDecipher(algorithm, privateKey);
    let dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function encrypt(password) {
    const cipher = crypto.createCipher(algorithm, privateKey);
    let crypted = cipher.update(password.toString(), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

module.exports = {
    decrypt,
    encrypt
};