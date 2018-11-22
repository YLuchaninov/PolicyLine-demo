const env = {
  /** be careful with the time zone **/
  get time() {
    return new Date();
  }
};

module.exports = env;