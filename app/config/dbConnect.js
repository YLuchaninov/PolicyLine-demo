const mongoose = require('mongoose');
const config = require('../config');

const options = {
    autoReconnect: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: 60
};

const connection_delay = 0;

module.exports = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            mongoose.connect(config.database.url, options).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        }, connection_delay);
    });
}
