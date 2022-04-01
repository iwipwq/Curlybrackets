const express = require("express");
const app = express();
const port = 5000
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(console.log("몽고DB연결됨"))
.catch((err) => console.log(err));

app.use('/api/auth', authRoute);

console.log('5252');

app.listen(port, () => {
    console.log("success!")
});