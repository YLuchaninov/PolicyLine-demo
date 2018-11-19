const env = {
    get time() {
        return new Date().getTime();
    },

    toObject() {
        return Object.assign({}, this);
    }
};

module.exports = env;