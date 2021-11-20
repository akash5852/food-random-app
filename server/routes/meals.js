const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

let Meal = require("../meal.model");

// get all meals
router.route("/").get(async (req,res) =>{
    const meals = await Meal.find({})
    res.send(Meals)
})

router.route("/addMeal").post(async (req,res) =>{
    var willAddMeal =  new Meal({});
    willAddMeal.name = req.body.name;
    willAddMeal.mealType = req.body.mealType;
    willAddMeal.save(function (err) {
        if (err) return console.error(err);
    });
})

router.route("/randomMeal").get(async (req,res) =>{
    Meal.find({ meal_type: req.query.meal_type}, function (err, docs) {
        var result = docs.map(function(doc) {return doc.meal_name;});
        res.send(result[Math.random() * result.length])
        if (err) return console.error(err);
    });
})

module.exports = router
