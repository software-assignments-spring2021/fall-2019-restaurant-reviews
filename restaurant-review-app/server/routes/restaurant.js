//restaurant router 
const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');


router.route('/').get((req, res ) => {
    Restaurant.find()
    .then(restaurants => res.json(restaurants))
    .catch(err => res.status(400).json('Err' + err));

})

router.route('/:id').get((req, res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => res.json(restaurant))
    .catch(err => res.status(400).json('Err' + err));
})

router.route('/add').post((req, res) =>{

    const {name,location} = req.body;
    const newRest = new Restaurant({name,location});
    newRest.save()
      .then(() => res.json({message:'restaurant added.',newRest}))
      .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;
