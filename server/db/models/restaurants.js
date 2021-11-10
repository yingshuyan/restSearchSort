const db = require("../db")
const {STRING, INTEGER, Op} = require("sequelize")
const Cuisine = require("./cuisines")

const Restaurant = db.define("restaurant",{
    name:{
        type:STRING,
        allowNull: false,
        unique: true
    },
    customer_rating : {
        type:INTEGER,
        defaultValue:1,
        allowNull: false,
    },
    distance: {
        type:INTEGER,
        defaultValue:50,
        allowNull: false,
    },
    price:{
        type:INTEGER,
        defaultValue:10,
        allowNull:false
    },
    cuisine_id:{
        type:INTEGER,
        allowNull:false
    }
})


Restaurant.filter = async(name,distance,price,rating,cuisineList) => {

    const restList = await Restaurant.findAll({
        where:{
            cuisine_id:cuisineList?cuisineList:{[Op.gte]:0},
            distance:{
                [Op.lte]:distance?distance:10
            },
            price:{
                [Op.lte]:price?price:50
            },
            customer_rating:{
                [Op.gte]:rating?rating:1
            },
            name:name?{[Op.iLike]:`%${name}%`}:{[Op.not]:null}     
        },
        include:[Cuisine]
    })
    
    return restList

}

Restaurant.sort=async(restList)=>{
    return restList.sort((a,b)=>{

        if(a.distance==b.distance){
            if(a.customer_rating==b.customer_rating){
                return a.price-b.price
            }else{
                return b.customer_rating - a.customer_rating
            }

        }else{
            return a.distance-b.distance
        }

    }

).slice(0,5)
}

module.exports = Restaurant