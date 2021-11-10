const db = require('./db');
const Cuisine= require('./models/cuisines');
const Restaurant = require('./models/restaurants');

Cuisine.hasMany(Restaurant,{foreignKey:"cuisine_id"});
Restaurant.belongsTo(Cuisine,{foreignKey:"cuisine_id"});

module.exports = {
db,
models:{
    Cuisine,
    Restaurant
},
}