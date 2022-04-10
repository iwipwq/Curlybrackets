const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

app.use(cors());

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.resolve(__dirname, './images')))
console.log(path.resolve(__dirname, './images'),"경로resolve");
mongoose.connect(process.env.MONGO_URL)
.then(console.log("몽고DB연결됨"))
.catch((err) => console.log(err));

console.log(process.env.MONGO_URL);
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "images");
    },filename:(req,file,cb) => {
        cb(null, req.body.name);
    },
    
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res) => {
    try {
        res.status(200).json("파일이 업로드 되었습니다.");
    } catch (err) {
        console.dir(err,"upload뮬터에러");
    }
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/category', categoryRoute);

console.log('5252');

app.listen(port, () => {
    console.log("success!")
});