'use strict';
require('dotenv').config()
const app = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const knex = require('knex')
const helpers = require('./test-helpers')
chai.use(chaiHttp);

let db


describe('Web Dev Toolkit', function () {
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })



  let server;
 before(function () {
     return app.startServer()
       .then(instance => server = instance);
   });
 
   after(function () {
     return server.stopServer();
   });

  describe('Static server', function () {

    it('GET request "/" should return nothing', function () {
      return chai.request(app)
        .get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(404);
          expect(res).to.be.html;
        });
    });

  });

  describe('404 handler', function () {

    it('should respond with 404 when given a bad path', function () {
      return chai.request(app)
        .get('/bad/path')
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });


  describe('GET /api/resources', function () {

    it('should return the resources ', function () {
      return chai.request(app)
        .get('/api/resources')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
        });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request(app)
        .get('/api/resources')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          res.body.forEach(function (item) {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('id', 'headline', 'text');
          });
        });
    });
  });

  

  describe('POST /api/users', function () {


    it('should create and return a new item when provided valid data', function () {
      const newUser = {
        'password': 'Password32!',
        'username': 'Test-User',
        'name': 'User-Test'
      };

      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('email', 'id', 'name', 'username');
        });
    });
        it('should delete the test user', function () {
          const newUser = {
            'password': 'Password32!',
            'username': 'Test-User',
            'name': 'User-Test'
          };
          return chai.request(app)
        .delete(`'/api/users:${newUser.username}'`);
    });

  });
  

});