const router = require("express").Router();
const User = require("../models/User");
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
            const updatedUser = await User.findByIdAndUpdate(req.param.id, {
                $set: req.body,
            });
            res.status(200).json(updatedUser);
    
        } catch {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("계정 소유자만 수정 가능합니다.")
    }
});

//DELETE

module.exports = router;