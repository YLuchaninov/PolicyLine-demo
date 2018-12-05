const mongoose = require('mongoose');

const {database : { connectionOptions: options }} = require('../config');


let attempt = 1;
const connect = (...args) => {
    if (options.autoReconnect) {
      if (attempt >= options.reconnectTries) {
        return Promise.reject();
      } else {
        console.log(`Attempt № ${attempt}`);
        attempt++;
      }
      return new Promise(resolve => {
        setTimeout(() => {
          mongoose.connect(...args)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              console.log(err);
              connect(...args)
            });
        }, options.reconnectInterval);
      });
    } else {
        return mongoose.connect(...args);
    }
};

module.exports = connect;
