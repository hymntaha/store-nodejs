const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('In the middleware');
    next();
});

app.use((req,res,next)=>{
    console.log('Another middleware');
    next();
});

app.listen(3000);
