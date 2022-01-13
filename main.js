const express = require('express');
const app = express();
const routes = require('./route.js');

app.listen(4000,()=>{
    console.log('Server is running on port 4000');
});

app.use('/',routes);