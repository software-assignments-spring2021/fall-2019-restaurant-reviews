//const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("../models/user.model");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');



module.exports = (passport) =>{

    const opts={
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'secret'
    };

    passport.use('jwt',
        new JWTStrategy(opts, (jwt_payload, done) =>{
            try{
                User.findOne({username:jwt_payload.id})
                .then(user =>{
                    if(user) {
                        console.log('user found in db in passport')
                        done(null,user);
                    }else{
                        console.log('user not found');
                        done(null,false);
                    }
                });
            }
            catch(err) { done(err);}
        }),
    
    
    
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}