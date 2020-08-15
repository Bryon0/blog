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

//Apply the schema to the database. Set up the model.
const Article = mongoose.model("Article", articleSchema);


app.route('/articles').get((req, res) => {
    Article.find({}, (err, foundArticles) => {
        if(!err)
        {
            console.log(foundArticles);
        } else {
            console.log(err);
        }
    });
}).post((req, res) =>{
    //Data from front end.
    const content = req.body.content;
    const title = req.body.title;

    const newArticle = new Article({
        content: content,
        title: title
    });

    newArticle.save((err) => {
        if(!err) {
            console.log("Successully saved to database");
        } else {
            console.log(err);
        }
    });
}).delete((req, res) => {
    const content = req.body.content;
    const title = req.body.title;

    Article.deleteMany({}, (err) =>{
        if(!err) {
            console.log("Successully deleted from database");
        } else {
            console.log(err);
        }
    })
});

app.route('/articles/:articleTitle').get((req, res) => {
    const title = req.params.articleTitle;
    Article.findOne({title: title}, (err, article) => {
        if(!err) {
            if(articleTitle) {
                res.send(article);
            } else {
                res.send("No article found.");
            }
        } else {
            console.log(err);
        }
    });
});

// app.get('/articles', (req, res) => {
//     Article.find({}, (err, results) => {
//         if(!err)
//         {
//             console.log(results);
//         } else {
//             console.log(err);
//         }
//     });
// });

// app.post('/articles', (req, res) =>{
//     //Data from front end.
//     const content = req.body.content;
//     const title = req.body.title;

//     const newArticle = new Article({
//         content: content,
//         title: title
//     });

//     newArticle.save((err) => {
//         if(!err) {
//             console.log("Successully saved to database");
//         } else {
//             console.log(err);
//         }
//     });
// });

// app.delete('/articles', (req, res) => {
//     const content = req.body.content;
//     const title = req.body.title;

//     Article.deleteMany({}, (err) =>{
//         if(!err) {
//             console.log("Successully deleted from database");
//         } else {
//             console.log(err);
//         }
//     })
// });

//Start up the server.
app.listen(3000, () => {
    console.log("Server started on port 3000.");
})