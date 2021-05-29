var express = require('express')
var mongoose = require('mongoose')
var app = express()
var bodyParser = require('body-parser');
const session = require("express-session");
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
const index = express();
index.use(
  session({
    resave: true,
    secret: "123456",
    saveUninitialized: true
  })
);


const categoryRoute = require('./route/CategoryRoute')
const productRoute = require('./route/ProductRoute')
app.use(categoryRoute)
app.use(productRoute)
mongoose.connect('mongodb://localhost:27017/joinDB')
.then(result => {
    app.listen(5000);
    console.log('Database connection successfully');
}).catch(err => {
    console.log("error at mongodb" + err);
});