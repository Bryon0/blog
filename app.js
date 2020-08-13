const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');

const app = express();

//Set up the type of files to be used with the view engine.
app.set('view engine', 'ejs');
//Set up the public folder in which to serve files from to the client.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

//Conect to the mongo db server and create the database if needed..
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true });

//Create your schema. This will determine what is available for the
//the database.
const articleSchema = {
    title: String,
    content: String
};

//Apply the schema to the database.
const Article = mongoose.Schema("Article", articleSchema);

//Start up the server.
app.listen(3000, () => {
    console.log("Server started on port 3000.");
})