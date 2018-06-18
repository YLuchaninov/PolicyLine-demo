let supertest = require('supertest');

let server = supertest.agent('http://localhost:3000/api');

let container;

module.exports = {
    inject: (diContainer) => {
        container = diContainer;
    }
};

describe('After All Tests:', function () {

    //User company A
    it('Delete User company A', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.user_a_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

    // User company B
    it('Delete User company B', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.user_b_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

    //User company C
    it('Delete User company C', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.user_c_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

    // Admin Company A
    it('Delete Admin Company A', function (done) {

        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.admin_a_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

    // Admin Company B
    it('Delete Admin Company B', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.admin_b_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

    // Admin Company C
    it('Delete Admin Company C', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.admin_c_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

    // Super Admin
    it('Delete Super Admin', function (done) {
        server
            .post('/user/delete')
            .set('Authorization', 'Bearer ' + container.superadmin_token)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                should(res.body).have.keys('message');
                should(res.body.message).eql('user deleted successfully');

                done();
            });
    });

});