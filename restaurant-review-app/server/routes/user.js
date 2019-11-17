//user router : includes login and register route

const router = require('express').Router();
const User = require('../models/user.model');
//use express-validator to validate inputs
const { check, validationResult } = require('express-validator');
//use bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
//use passport to authenticate user when logging in
const passport = require('passport');
const jwt =require('jsonwebtoken');


//route to fecth all user info from database
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//specify id so that it can fetch the unique user
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


//register
router.route('/register').post([
  //validate user input
    check('firstname').exists(),
    check('lastname').exists(),
    check('email').isEmail(),
    check('password').isLength({min:6}),
    
  ],(req, res) => {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {firstname,lastname,email,password} = req.body;
 
  const newUser = new User({firstname,lastname,email,password});
  
  //encrypt the password
  bcrypt.genSalt(10, (err,salt) =>{
    bcrypt.hash(newUser.password, salt, (err, hash)=> {
      if(err){
        console.log(err);
      }

      //replace the password with encrpyted one
      newUser.password = hash;
      newUser.save()
      .then(() => res.json({message:'You have registered! Now please sign in.',newUser}))
      .catch(err => res.status(400).json('Error: ' + err));
    })
  });


  
});

// log in 
router.route('/login').post([
  //validate login info
    check('email').exists(),
    check('email').isEmail(),
    check('password').exists()
    
  ],(req,res)=>{
  // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({email:req.body.email})
    .then(user => {
        if(!user){
            return res.status(400).send('The email is not registered');
        }
        //match password
        bcrypt.compare(req.body.password, user.password)
        .then(isMatch =>{
            if(isMatch){
                //sign token for the user
                jwt.sign({user}, 'secret', {expiresIn:'3600s'},(err, token)=>{
                    res.json({token: 'Bearer ' + token , id:user._id});
                })         
            }
            else{
                return res.status(403).send('Incorrect password.');
            }

        });


    })
    .catch(err => res.send(err));
    console.log('Logged in!'); 
    
});


//protected route
router.route('/protected').get( (req,res) =>{
  const user = res.body;
  passport.authenticate('jwt', {session:false}, (err, user, info)=>{

    if(err) {
      console.log(err);
    }
    if(info !== undefined){
      console.log(info.message);
      res.send(info.message);
    }
    else{
      console.log('user found in mongodb');
      res.status(200).send({
        auth:true,
        firstname:user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        message:'user found in mongodb'

      })

    }
  })(req,res,next);
  
});



//implement delete user account
router.route('/:id').delete( (req, res) => {

  User.findByIdAndDelete(req.params.id)
  .then( ()=> res.json("You deleted your account."))
  .catch( err => res.status(400).json('Err' + err));


});

//get a user's favorite restaurants. return a json that contains favored restaurants list
router.route('/:id/favorites').get( (req, res) =>{
  User.findById(req.params.id)
      .then(users => res.json(users.favoriteRes))
      .catch(err => res.status(400).json('Error: ' + err));
})

//add a user's favorite restaurants.
router.route('/:id/favorites/add').post( (req, res) =>{
  User.findById(req.params.id)
      .then( (user) =>{
          user.favoriteRes.push(req.body.newFavorite);
          user.save()
              .then( () => res.json("Favorite restaurants added!"))
              .catch( (err) => res.status(400).json('Error' + err));
      })
      .catch( (err) => res.json('Err' + err));
})

module.exports = router;