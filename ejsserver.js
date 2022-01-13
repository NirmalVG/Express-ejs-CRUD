const express = require("express");
const app = express();
const routes = require("./ejsroute.js");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

app.use('/',routes);
