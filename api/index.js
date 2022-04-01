const express = require("express");
const app = express();
const port = 5000
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(console.log("몽고DB연결됨"))
.catch((err) => console.log(err));

console.log('5252');

app.use("/gogo", (req, res) => {
    console.log("gogo url")
})

app.get('/', (req, res) => {
    res.send('안녕하세용')
});

app.listen(port, () => {
    console.log("success!")
});