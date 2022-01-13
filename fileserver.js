const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();

app.use(express.static("public"));

app.get("/upload", (req, res) => {
    res.sendFile(__dirname + "/public/" + "file.html");
});

app.post('/postfile',upload.single('upload_file'),urlencodedParser,(req,res)=>{
    response = {
        file: req.file.upload_file
    }
    console.log(response);
});

app.get('/edit/:id', (req, res) => {
    res.send("The id is: " + req.params.id);
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});