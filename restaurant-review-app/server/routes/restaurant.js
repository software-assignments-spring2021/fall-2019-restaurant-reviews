//restaurant router
const router = require("express").Router();
let Restaurant = require("../models/restaurant.model");

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
  const { name, location, dishes, comments } = req.body;
  const newRest = new Restaurant({ name, location, dishes, comments });
  newRest
    .save()
    .then(() => res.json({ message: "restaurant added.", newRest }))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route('/:id/addRating').post((req, res) =>{
//     const {newRating} = req.body;
//     Restaurant.findById(req.params.id)
//     .then(restaurant => res.json(restaurant))
//     .catch(err => res.status(400).json('Err' + err));

//     const newRest = new Restaurant({name,location,dishes,comments});
//     newRest.save()
//       .then(() => res.json({message:'restaurant added.',newRest}))
//       .catch(err => res.status(400).json('Error: ' + err));
// })

module.exports = router;
