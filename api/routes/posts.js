const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req,"클리어언트 요청객체");
        console.log(req.body.username,"username");
        const post = await Post.findById(req.params.id);
        console.log(post);
        console.log(post.username);
        console.log(post.username === req.body.username);
        if(post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new: true})
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("작성자만 수정 가능합니다.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username) {
            try {
                // await Post.findByIdAndDelete(req.params.id);
                await post.delete();
                res.status(200).json("게시물이 정상적으로 삭제되었습니다.");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("글 작성자만 삭제할 수 있어요.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);   
    }
})

//GET ALL POSTS
router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username) {
            posts = await Post.find({username:username}).skip(skip).limit(limit).sort({_id:-1});;
        } else if(catName) {
            posts = await Post.find({categories: {
                $in:[catName]
            }}).skip(skip).limit(limit).sort({_id:-1});;
        } else {
            posts = await Post.find().skip(skip).limit(limit).sort({_id:-1});
        }
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;