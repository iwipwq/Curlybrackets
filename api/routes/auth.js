const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        console.log(req,"req")
        const user = await User.findOne({username: req.body.username});
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!user) {
            console.log("아이디문제")
            res.status(400).json("아이디 혹은 비밀번호가 틀렸습니다.(사실 아이디가 틀림)");
        } else if(!validated) {
            console.log("비번문제");
            return res.status(400).json("아이디 혹은 비밀번호가 틀렸습니다.(사실 비밀번호가 틀림)");
        } else {
            const { password, ...나머지정보들 } = user._doc;
            res.status(200).json(나머지정보들);
            console.log("요청성공")
        }
    } catch (err) {
        console.log("에러발생")
        res.status(500).json(err);
    }
})

module.exports = router;