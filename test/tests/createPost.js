let supertest = require('supertest');
let should = require('should');

let server = supertest.agent('http://localhost:3000/api');

let container;

module.exports = {
    inject: (diContainer) => {
        container = diContainer;
    }
};

describe('Create Post testing:', function () {

    it('Create Post by User Company A', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.user_a_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content user company_a",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                container.user_a_post_cuid = res.body.post.cuid;
                done();
            });
    });

    it('Create Post by User Company B', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.user_b_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content user company_b",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                container.user_b_post_cuid = res.body.post.cuid;
                done();
            });
    });

    it('Create Post by User Company C', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.user_c_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content user company_c",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                container.user_a_post_cuid = res.body.post.cuid;
                done();
            });
    });

    it('401 Post by Admin Company A', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.admin_a_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content admin company_a",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(401, done);
    });

    it('401 Post by Admin Company B', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.admin_b_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content admin company_b",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(401, done);
    });

    it('401 Post by Admin Company C', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.admin_c_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content admin company_c",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(401, done);
    });

    it('401 Post by Super Admin', function (done) {
        server
            .post('/posts')
            .set('Authorization', 'Bearer ' + container.admin_c_token)
            .send({
                "post": {
                    "title": "post",
                    "content": "content super admin",
                    "location": [49.9935, 36.2304],
                    "tags": ["tag", "location"],
                    "category": "inner"
                }
            })
            .expect('Content-type', /json/)
            .expect(401, done);
    });

});