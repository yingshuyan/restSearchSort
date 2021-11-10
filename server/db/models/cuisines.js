const db = require("../db")
const {STRING, INTEGER,DATE,Op} = require("sequelize")

const Cuisine = db.define("cuisine",{
    id:{
        type:INTEGER,
        primaryKey:true    
    },
    name:{
        type:STRING,
        allowNull:false
    },

})

Cuisine.filter = async (cuisine) => {
    if (!cuisine) {
        return null
    }
    const cuisineList = await Cuisine.findAll({
        where:{
            name:{
                [Op.iLike]: `%${cuisine}%`
            },
        },
        attributes: ['id']
    })
    return cuisineList.length?cuisineList.map(cuisine=>cuisine.id):cuisineList


}


module.exports = Cuisine