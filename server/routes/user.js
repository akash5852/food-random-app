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


    const userExists = await User.exists({ username: req.body.username });
    if (userExists) {
        res.send("Sorry but this username has been taken");
        console.log("User exists");
    } else {
        data.password = await bcrypt.hash(req.body.password, 10)
        var newUser = new User(data);
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

    const user = await User.findOne({ username: data.username });
    if (user) {

        let passcheck = false;
        bcrypt.compare(data.password, user.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: user._id,
                        username: user.username,
                    }
                    jwt.sign(
                        payload,
                        process.env.PASSPORTSECRET,
                        { expiresIn: 86400 },
                        (err, token) => {
                            if (err) return res.json({ message: err })
                            return res.json({
                                message: 'Success',
                                token: "Bearer " + token
                            })
                        }
                    )
                } else {
                    return res.json({
                        message: "Invalid Username or Password"
                    })
                }

            })

    
    }
})

const verifyJWT = (req, res, next) => {
    // removes 'Bearer` from token
    const token = req.headers["access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if (err) return res.json({ isLoggedIn: false, message: "Failed To Authenticate" })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            req.user.pfp = decoded.pfp
            next()
        })
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false })
    }
}

router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({ isLoggedIn: true, username: req.user.username })
})

router.route("/getUsername").get(async (req, res) => {
    verifyJWT(req, res);
    res.json({ isLoggedIn: true, username: req.user.username })
})

module.exports = router