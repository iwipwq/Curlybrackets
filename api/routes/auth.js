const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require('path')
const dotenv = require("dotenv").config({path: path.resolve(__dirname, '../.env')})

const errMessages = process.env.ERROR_MESSAGES;
console.dir(process.env.ERROR_MESSAGES);
console.log(path.resolve(__dirname, '../.env'));
//REGISTER
router.post("/register", async (req, res) => {
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
        console.dir(err);
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        console.log(req,"req");
        const user = await User.findOne({username: req.body.username});
        if (user) {
            console.log ("아이디확인성공");
            try {
                console.log("비밀번호확인시작");
                const validate = await bcrypt.compare(req.body.password, user.password);
                if(validate) {
                    const {password, ...나머지정보들} = user._doc;
                    res.status(200).json(나머지정보들);
                    console.log("사용자 인증 성공");
                } else {
                    res.status(400).json("존재하지 않는 아이디거나, 잘못된 아이디 혹은 패스워드입니다.");
                }
            } catch (err) {
                console.log("비번확인중서버에러");
                res.status(500).json(err);
            }
        } else {
            console.log("아이디문제");
            res.status(400).json("존재하지 않는 아이디거나, 잘못된 아이디 혹은 패스워드입니다.");
        }
    } catch (err) {
        console.log("에러발생",err);
        res.status(500).json(err);
    }
});

module.exports = router;