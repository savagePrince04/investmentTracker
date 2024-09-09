// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
try {
   mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1")
   console.log("Server Working fine")
} catch (error) {
console.log(error)
}
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT;
app.listen(PORT || 4000, ()=>{
   console.log('App started on PORT: ', PORT);
})

