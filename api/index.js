const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(console.log("몽고DB연결됨"))
.catch((err) => console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

console.log('5252');

app.listen(port, () => {
    console.log("success!")
});