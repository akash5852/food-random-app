const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/User.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../config.env" });

router.route("/register").post(async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(data);

    var newUser = new User(data);
    const userExists = await User.exists({ username: req.body.username, password: req.body.password });
    if (userExists) {
        res.send("Sorry but this username has been taken");
        console.log("User exists");
    } else {
        newUser.save((err) => {
            if (err) {
                console.log("Something went wrong with adding that user");
            } else {
                console.log("User added successfully");
                res.send(`User has been added`);
            }
        });
    }



})


router.route("/login").post(async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const user = await User.findOne({ username: req.body.username });
    if (user) {
        let passcheck = false;
        bcrypt.compare(user.password, data.password)
        .then(isCorrect => {
            passcheck = true;
        })
        if (passcheck = true) {
            console.log("nice")
            const payload = {
                id: user._id,
                username: user.username,
            }

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 86400 },
                (err, token) => {
                    if (err) return res.json({ message: err })
                    return res.json({
                        message: 'Success',
                        token: "Bearer " + token
                    })
                }
            )
        }else{
            return res.json({
                message: "Invalid Username or Password"
            })
        }
    } else {
        return res.json({
            message: "Invalid Username or Password"
        })
    }
})

const verifyJWT = (req, res, next) => {
    // removes 'Bearer` from token
    const token = req.headers["access-token"]?.split(' ')[1]

    if (token) {
        console.log(token)
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false, 
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}

router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username})
})

router.route("/getUsername").get(async (req, res) =>{
    verifyJWT(req,res);
    res.json({isLoggedIn: true, username: req.user.username})
})

module.exports = router