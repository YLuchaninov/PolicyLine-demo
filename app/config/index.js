module.exports = {
    server: {
        schema: 'http',
        host: '0.0.0.0',
        port: 3000
    },
    database: {
        host: 'mongo',
        port: 27017,
        db: 'express-api-blog',
        // todo change to  'mongodb://mongo:27017/express-api-blog'
        url: 'mongodb://127.0.0.1:27017/express-api-blog'
    },
    key: {
        privateKey: 'n4k78c2nyjd3lds845hl4'
    }
};