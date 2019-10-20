//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const assert = require('chai').assert;
const User = require('../models/user.model');
const should = require('chai').should();
const server = require('../server');
const chaiHttp = require('chai-http');
const chai = require('chai');

chai.use(chaiHttp);
//test user routes
describe('User routes', () => {

    //empty database before each test 
    beforeEach( (done) => {
      User.remove({}, (err) =>{
          done();
      });
    });
    //Test /GET
    describe('get user info', () => {
      it('it should return all the user information', (done) => {
          chai.request(server)
              .get('/user')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
      });
    });

    //test register
    describe('register', () => {
      it('it should not allow empty first name', (done) => {

          const user = {
          
            lastname: 'wu',
            email: 'hw1635@nyu.edu',
            password: 'admin123',
            password1: 'admin123'
          }
          chai.request(server)
              .post('/user/register')
              .send(user)
              .end((err, res) =>{
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                // res.should.have.status(200);
                done();
              })
      });
    

   
      it('it should not allow empty last name', (done) => {

        const user = {
          firstname: 'martin',
          email: 'hw1635@nyu.edu',
          password: 'admin',
          password1: 'admin'
        }
        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) =>{
              // res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');          
              done();
            })
      });
  
    
    });
  });
