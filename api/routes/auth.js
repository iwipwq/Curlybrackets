const router = require("express").Router();
const { json } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req,res) => {
    try {

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

//LOGIN

module.exports = router;