let supertest = require('supertest');

let server = supertest.agent('http://localhost:3000/api');

let container;

module.exports = {
    inject: (diContainer) => {
        container = diContainer;
    }
};

describe('Before All Tests:', function () {

    //User company A
    it('Registration User Company A', function (done) {
        server
            .post('/user')
            .send({
                'username': 'user_a@company_a.com',
                'password': 'test',
                'location': [49.98081, 36.25272],
                'company': 'company_a',
                'age': 25,
                'role': 'user'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'user_a@company_a.com',
                        'password': 'test'
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.user_a_token = res.body.token;
                        done();
                    });
            });
    });

    // User company B
    it('Registration User Company B', function (done) {
        server
            .post('/user')
            .send({
                'username': 'user_b@company_b.com',
                'password': 'test',
                'location': [40.709452, -73.938578],
                'company': 'company_b',
                'age': 25,
                'role': 'user'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'user_b@company_b.com',
                        'password': 'test'
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.user_b_token = res.body.token;
                        done();
                    });
            });
    });

    // User company C
    it('Registration User Company C', function (done) {
        server
            .post('/user')
            .send({
                'username': 'user_c@company_c.com',
                'password': 'test',
                'location': [49.98081, 36.25272],
                'company': 'company_c',
                'age': 25,
                'role': 'user'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'user_c@company_c.com',
                        'password': 'test',
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.user_c_token = res.body.token;
                        done();
                    });
            });
    });

    // Admin Company A
    it('Registration Admin Company A', function (done) {
        server
            .post('/user')
            .send({
                'username': 'admin_a@company_a.com',
                'password': 'test',
                'location': [49.98081, 36.25272],
                'company': 'company_a',
                'age': 25,
                'role': 'admin'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'admin_a@company_a.com',
                        'password': 'test',
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.admin_a_token = res.body.token;
                        done();
                    });
            });
    });

    // Admin Company B
    it('Registration Admin Company B', function (done) {
        server
            .post('/user')
            .send({
                'username': 'admin_b@company_b.com',
                'password': 'test',
                'location': [49.98081, 36.25272],
                'company': 'company_b',
                'age': 25,
                'role': 'admin'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'admin_b@company_b.com',
                        'password': 'test',
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.admin_b_token = res.body.token;
                        done();
                    });
            });
    });

    // Admin Company C
    it('Registration Admin Company C', function (done) {
        server
            .post('/user')
            .send({
                'username': 'admin_c@company_c.com',
                'password': 'test',
                'location': [49.98081, 36.25272],
                'company': 'company_c',
                'age': 25,
                'role': 'admin'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'admin_c@company_c.com',
                        'password': 'test',
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.admin_c_token = res.body.token;
                        done();
                    });
            });
    });

    // Super Admin
    it('Registration Super Admin', function (done) {
        server
            .post('/user')
            .send({
                'username': 'super_admin@test.com',
                'password': 'test',
                'location': [49.98081, 36.25272],
                'company': 'testCompany',
                'age': 25,
                'role': 'superAdmin'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).eql({
                    'message': 'Ok'
                });

                server
                    .post('/user/login')
                    .send({
                        'username': 'super_admin@test.com',
                        'password': 'test',
                    })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        container.superadmin_token = res.body.token;
                        done();
                    });
            });
    });
});