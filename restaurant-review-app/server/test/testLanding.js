
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const assert = require('chai').assert;
const User = require('../models/user.model');
const should = require('chai').should();
const server = require('../server');
const chaiHttp = require('chai-http');
const chai = require('chai');
const fun = require('restaurant-review-app/client/src/pages/landing')

chai.use(chaiHttp);

let x = fun();
console.log(x);

