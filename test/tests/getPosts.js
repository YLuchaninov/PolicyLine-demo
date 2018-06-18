let supertest = require('supertest');
let should = require('should');

let server = supertest.agent('http://localhost:3000/api');

let container;

module.exports = {
    inject: (diContainer) => {
        container = diContainer;
    }
};

describe('Get Posts testing:', function () {

});