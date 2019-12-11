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

router.route("/:id/addRatings").post((req, res) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      let m_i = restaurant.menu_items;
      let ratings = req.body;
      for (const name of Object.keys(ratings)) {
        let currentRatings = m_i[name][1];
        currentRatings.push(ratings[name]);
        m_i[name] = currentRatings;
      }
      restaurant.menu_items = m_i;
      restaurant
        .save()
        .then(() => res.json("gucc"))
        .catch(err => res.status(400).json("Errorr" + err));
    })
    .catch(err => res.json("Err" + err));
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
