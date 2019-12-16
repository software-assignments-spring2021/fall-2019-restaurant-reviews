//restaurant router
const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");

router.route("/").get((req, res) => {
  Restaurant.find()
    .then(restaurants => res.json(restaurants))
    .catch(err => res.status(400).json("Err" + err));
});

router.route("/:id").get((req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => res.json(restaurant))
    .catch(err => res.status(400).json("Err" + err));
});


router.route("/add").post((req, res) => {
  const { name, address, rating, cuisine, menu, reviews, menu_items } = req.body;
  const newRest = new Restaurant({ name, address, rating, cuisine, menu, reviews, menu_items});
  newRest
    .save()
    .then(() => res.json({ message: "restaurant added.", newRest }))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id/add/rating&comment").post((req, res) => {

 
  Restaurant.findById(req.params.id)
    .then( (restaurant) => {
      const ratings = parseInt(req.body.dishrating);
      const name = req.body.dishname;
      const comments = req.body.comments;

      restaurant.new_reviews.forEach( (review) =>{
        
        if(review.dishname === name){
          review.ratings.push(ratings);
          if(comments != null){
            review.comments.push(comments);
          }
        }
      })
      let op = restaurant.new_reviews.filter(data => (data.dishname == name));
      // res.json(op);
      if(op.length == 0){
        const newdish = {dishname:name,ratings:new Array(),comments:new Array()};
        newdish.ratings.push(ratings);
        newdish.comments.push(comments);
        restaurant.new_reviews.push(newdish);
      }

      restaurant.save()
        .then(() => {
          res.json(restaurant.new_reviews); 
        })
        .catch(err => res.status(400).json("Errorr" + err));
    })
    .catch(err => res.json("Err" + err));
});




module.exports = router;
