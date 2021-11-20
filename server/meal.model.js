const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Meal = new Schema({
    meal_name: {
        type: String
    },
    meal_type: {
        type: String
    }
});
module.exports = mongoose.model('Meal',Meal);