const express = require("express");
const mongoose = require("mongoose");
const mealRoutes = express.Router();

let Meal = require("../meal.model");

mealRoutes.route("/meal").get((req,res)=>{
    
})