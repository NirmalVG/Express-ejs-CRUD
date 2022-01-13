const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://127.0.0.1:27017";
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        console.log("connect to database");
        const db = client.db("MERN-1");
        const collection = db.collection("users");
        app.set("view engine", "pug");
        app.set("views", "./views");
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(express.static("public"));

        app.get("/user", (req, res) => {
            res.render("pugfile");
        });

        app.post("/postdata", (req, res) => {
            collection
                .insertOne(req.body)
                .then((result) => {
                    res.redirect("/user");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    })
    .catch((error) => console.error(error));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
