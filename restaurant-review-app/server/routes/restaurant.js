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
    .then(restaurant => res.json(restaurant.menu_items))
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

router.route("/:id/addRatings").post((req, res) => {

  Restaurant.findById(req.params.id)
    .then( (restaurant) => {
      const ratings = parseInt(req.body.dishrating);
      const name = req.body.dishname;
      restaurant.menu_items[name][1].push(ratings);
      restaurant.save()
        .then(() => {
          res.json(restaurant.menu_items[name]); 
        })
        .catch(err => res.status(400).json("Errorr" + err));
    })
    .catch(err => res.json("Err" + err));
});

router.route('/:id/addComments').post((req, res) =>{
    const {newRating} = req.body;
    Restaurant.findById(req.params.id)
    .then(restaurant => res.json(restaurant))
    .catch(err => res.status(400).json('Err' + err));

    const newRest = new Restaurant({name,location,dishes,comments});
    newRest.save()
      .then(() => res.json({message:'restaurant added.',newRest}))
      .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
