const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://127.0.0.1:27017";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        console.log("connect to database");
        const db = client.db("MERN-1");
        const collection = db.collection("products");
        route.use(bodyParser.urlencoded({ extended: false }));
        route.use(bodyParser.json());
        route.post("/post", (req, res) => {
            collection
                .insertOne(req.body)
                .then((result) => {
                    res.redirect("/products");
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        route.get("/products", (req, res) => {
            collection
                .find()
                .toArray()
                .then((result) => {
                    res.render("index.ejs", { test: result });
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        route.get("/:pname", (req, res) => {
            collection
                .find({ pname: req.params.pname })
                .toArray()
                .then((result) => {
                    res.render("edit.ejs", { test: result });
                });
        });

        route.post("/update", (req, res) => {
            collection
                .findOneAndUpdate(
                    { pname: req.body.pname },
                    {
                        $set: {
                            pname: req.body.pname,
                            pprice: req.body.pprice,
                        },
                    },
                    { upsert: true }
                )
                .then((result) => {
                    res.redirect("/products");
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        route.get("/delete/:pname", (req, res) => {
            collection
                .deleteOne({ pname: req.params.pname })
                .then((result) => {
                    res.redirect("/products");
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    })

    .catch((error) => console.error(error));

module.exports = route;
