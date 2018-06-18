let supertest = require('supertest');
let should = require('should');

let server = supertest.agent('http://localhost:3000/api');

let container;

module.exports = {
    inject: (diContainer) => {
        container = diContainer;
    }
};

describe('General User testing:', function () {

    let token;

    it('Registration', function (done) {
        server
            .post('/user')
            .send({
                'username': 'user@company_a.com',
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

                done();
            });
    });

    it('Login', function (done) {
        server
            .post('/user/login')
            .send({
                'username': 'user@company_a.com',
                'password': 'test'
            })
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('username');
                should(res.body).have.keys('token');
                token = res.body.token;

                done();
            });
    });

    it('Delete', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });
});