const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");



module.exports = (passport) =>{

    //local strategy
    passport.use(new LocalStrategy( {usernameField: 'email'}, (email, password, done)=> {
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
                    return done(null, user);
                }
                else{
                    return done(null, false, {message:'Incorrect password'} );
                }

            });
        })
        .catch(err => console.log(err));
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}