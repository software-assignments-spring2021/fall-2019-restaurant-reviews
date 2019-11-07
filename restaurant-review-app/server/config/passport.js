const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret =require('./jwtConfig');
// import { Session } from 'inspector';

module.exports = (passport) =>{

    //local strategy
    passport.use('login',new LocalStrategy( {usernameField: 'email',session:false} , (email, password, done)=> {
        //match username

        User.findOne({email:email})
        .then(user => {

            if(!user){
                return done(null, false, {message: 'The email is not registered'});
            }
       

            //match password
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    //sign token for the user
                    jwt.sign({user}, 'secretKey', {expiresIn:'3600s'},(err, token)=>{
                              
                            return done(null, user);   
                    })
                    
                }
                else{
                    return done(null, false, {message:'Incorrect password'} );
                }

            });


        })
        .catch(err => console.log(err));
    }))

    const opts={
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: jwtSecret.secret
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