'use strict';
require('dotenv').config()
const app = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('theConsole API', function () {

  let server;
 /*  before(function () {
    return app.startServer()
      .then(instance => server = instance);
  });

  after(function () {
    return server.stopServer();
  }); */

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


  describe('GET /api/articles', function () {

    it('should return the Articles ', function () {
      return chai.request(app)
        .get('/api/articles')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
        });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request(app)
        .get('/api/articles')
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
   
 describe('POST /api/comments', function () {
    

    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'text': 'The best article about cats ever!',
        'article_id':'1',
        'user_id': '1'
            };
      return chai.request(app)
        .post('/api/comments')
        .send(newItem)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('text', 'article_id', 'user_id');
          expect(res.body.article_id).to.equal(newItem.article_id);
          expect(res.body.user_id).to.equal(newItem.user_id);
          expect(res.body.text).to.equal(newItem.text);
        });
    });

    it('should return an error when missing "User Id" field', function () {
      const newItem = {
        'foo': 'bar'
      };
      return chai.request(app)
        .post('/api/comments')
        .send(newItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `User Id` in request body');
        });
    });

  }); 

  describe('POST /api/users', function () {
    

    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'password': 'Password34!',
        'username':'Test User',
        'name': 'User Test'
            };
      return chai.request(app)
        .post('/api/users')
        .send(newItem)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('password', 'username', 'name');
          expect(res.body.username).to.equal(newItem.username);
          expect(res.body.name).to.equal(newItem.name);
          expect(res.body.password).to.equal(newItem.password);
        });
    });

    it('should return an error when missing "Username" field', function () {
      const newItem = {
        'foo': 'bar'
      };
      return chai.request(app)
        .post('/api/users')
        .send(newItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `Username` in request body');
        });
    });

  }); 
  /*  

  describe('PUT /api/articles/:id', function () {

    it('should update the note', function () {
      const updateItem = {
        'headline': 'What about dogs?!',
        'text': 'woof woof'
      };
      return chai.request(app)
        .put('/api/articles/1')
        .send(updateItem)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'headline', 'text');

          expect(res.body.id).to.equal(1);
          expect(res.body.headline).to.equal(updateItem.headline);
          expect(res.body.content).to.equal(updateItem.content);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      const updateItem = {
        'headline': 'What about dogs?!',
        'text': 'woof woof'
      };
      return chai.request(app)
        .put('/api/articles/DOESNOTEXIST')
        .send(updateItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it('should return an error when missing "headline" field', function () {
      const updateItem = {
        'foo': 'bar'
      };
      return chai.request(app)
        .put('/api/articles/1005')
        .send(updateItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `headline` in request body');
        });
    });

  });*/

  describe('DELETE  /api/comments/:id', function () {

    it('should delete an item by id', function () {
      return chai.request(app)
        .delete('/api/comments/1')
        .then(function (res) {
          expect(res).to.have.status(204);
        });
    });

  });

});