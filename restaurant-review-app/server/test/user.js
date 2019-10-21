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
    //test /GET
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
    //test delete 
    // describe('delete user account', () =>{
    //   it('it should delete the user data from database', (done) =>{

    //     chai.request(server)
    //         .delete('/user/:id')
    //         .end((err, res) =>{
              
    //           done();
    //         })
    //   })
    // })

    //test register
    describe('register', () => {
      it('it should not allow empty first name', (done) => {

          const user = {
          
            lastname: 'wu',
            email: 'hw1635@nyu.edu',
            password: 'admin123',
           
          }
          chai.request(server)
              .post('/user/register')
              .send(user)
              .end((err, res) =>{
               
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

      it('it should not allow empty email', (done) => {

        const user = {
          firstname: 'Martin',
          lastname: 'wu',
          password: 'admin123',
         
        }
        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) =>{
              
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              // res.should.have.status(200);
              done();
            })
      });

      it('it should not allow empty password', (done) => {

        const user = {
          firstname: 'Martin',
          lastname: 'wu',
          email: 'hw1635@nyu.edu',
          
        }
        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) =>{
              
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              // res.should.have.status(200);
              done();
            })
      });

      it('it should register user successfully', (done) => {

        const user = {
          firstname: 'Martin',
          lastname: 'Wu',
          email: 'hw1635@nyu.edu',
          password: 'admin123',
        
        }
        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) =>{
             // console.log(res.body);

              res.body.should.have.property('message').eql('You have registered! Now please sign in.');
              res.body.newUser.should.have.property('firstname');
              res.body.newUser.should.have.property('lastname');
              res.body.newUser.should.have.property('email');
              res.body.newUser.should.have.property('password');
              res.should.have.status(200);
              done();
            });
      });

    });
//test login 
  describe( 'Log in' ,() => {
    it('email should not be empty', (done) => {
      const input = {
        email:'',
        password:'admin123'
      }
      chai.request(server)
          .post('/user/login')
          .send(input)
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
    });
    
    it('password should not be empty', (done) => {
      const input = {
        email:'hw1635@nyu.edu',
        password:'admin123'
      }
      chai.request(server)
          .post('/user/login')
          .send(input)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(401);
            
            done();
          });
    });
    
    // it('user should be able to login', (done) => {
    //   const input = {
    //     email:'hw1635@nyu.edu',
    //     password:'admin123'
    //   }
    //   chai.request(server)
    //       .post('/user/login')
    //       .send(input)
    //       .end((err, res) => {
    //         res.should.have.status(200);
            
    //         done();
    //       });
    // })
    
    
  });

});


  
  

  
    
 
