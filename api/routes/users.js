const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                $set: req.body,
                },
                { new: true });
            res.status(200).json(updatedUser);
    
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("계정 소유자만 수정 가능합니다.")
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.body.userId);
    console.log(req.body.password);
    console.log(req.params.id);
    if(req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id);
        if(user) {
            try {
                console.log("비밀번호확인시작");
                const validate = await bcrypt.compare(req.body.password, user.password);
                if(validate) {
                    const {password, ...나머지정보들} = user._doc;
                    res.status(200).json(나머지정보들);
                    console.log("사용자 인증 성공");
                    try {
                        await Post.deleteMany({ username : user.username })
                        await User.findByIdAndDelete(req.params.id);
                        res.status(200).json("계정이 삭제되었습니다.")
                    } catch (err) {
                        res.status(500).json(err);
                    }
                } else {
                    res.status(400).json("비밀번호가 틀렸습니다.(비밀번호가 틀림)");
                }
            } catch (err) {
                console.log("비번확인중서버에러");
                res.status(500).json(err);
            }
            
        } else {
            res.status(404).json("사용자를 찾을 수 없습니다.")
        }
    } else {
        res.status(401).json("본인 소유 계정만 삭제 가능합니다.")
    }
})

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch(err) {
        res.status(500).json(err);   
    }
})

module.exports = router;