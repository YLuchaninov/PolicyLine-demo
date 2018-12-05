module.exports = {
    server: {
        schema: 'http',
        host: 'localhost',
        port: 3000
    },
    database: {
        host: 'mongo',
        port: 27017,
        db: 'express-api-blog',
        url: 'mongodb://mongo:27017/express-api-blog',
        connectionOptions: {
          autoReconnect: true,
          reconnectInterval: 5000,
          reconnectTries: 60
        }
    },
    key: {
        privateKey: 'n4k78c2nyjd3lds845hl4'
    }
};