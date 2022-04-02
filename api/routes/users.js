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
router.delete('/user:id', async (req, res) => {
    if(req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id);
        if(user) {
            try {
                await Post.deleteMany({ username : user.username })
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("계정이 삭제되었습니다.")
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).json("사용자를 찾을 수 없습니다.")
        }
    } else {
        res.status(401).json("본인 소유 계정만 삭제 가능합니다.")
    }
})

module.exports = router;