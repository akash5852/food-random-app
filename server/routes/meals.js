const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
let Meal = require("../meal.model");

//Gets all meals in the cluster
router.route("/").get(async (req, res) => {
    try {
        const meals = await Meal.find({});
        res.json(meals);
    } catch (err) {
        return `error occured`;
    }
})

//Adds new meal into the cluster
router.route("/addMeal").post(async (req, res) => {
    const data = {
        meal_name: req.body.name,
        meal_type: req.body.mealType
    }
    var newMeal = new Meal(data);
    newMeal.save((err) => {
        if (err) {
            console.log("Something went wrong with adding that meal");
        } else {
            console.log("Meal added successfully");
            res.send("Meal Added");
        }
    });

})

//Gets a random meal from the cluster
router.route("/randomMeal").get(async (req, res) => {
    try {
        const randMeals = await Meal.find({ meal_type: req.query.meal_type });
        let i = Math.floor(Math.random() * randMeals.length);
        let randMeal = randMeals[i].meal_name;
        console.log(randMeal);
        res.send(randMeal);
    } catch (err) {
        return `error occured`;
    }
})

module.exports = router
