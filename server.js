require('dotenv');
const { json } = require('body-parser');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const userRouter  = require('./routes/UserRoute');
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API Test");
})


app.use('/users',userRouter);


app.listen(3000, () => {
    console.log("Server is Running on Port:3000");

})