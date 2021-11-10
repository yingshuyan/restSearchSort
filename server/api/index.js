const router = require('express').Router()
const {models:{Cuisine,Restaurant}} = require("../db")

router.get("/restaurants",async(req,res,next)=> {
    try{
        const {name,rating,distance,price,cuisine} = req.query
        const cuisineList = await Cuisine.filter(cuisine)
        const filteredRestList = await Restaurant.filter(name,distance,price,rating,cuisineList)
        const sortedRestList = await Restaurant.sort(filteredRestList)
        res.send(sortedRestList)
    }catch(er){
        next(er)
    }
}
)
module.exports = router