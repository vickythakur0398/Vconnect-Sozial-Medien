//...1 to shoot up server we have installed npm install express so 
const express = require(`express`);
//taking functionality of express in this app
const app = express();
const port = 8000;




//1.1 shooting up the server
app.listen(port, function(err){
    if(err){
        console.log(`error while hitting up the server :${err}`);
    }

    console.log(`wooh!! server is running fine on port: ${port}`);
})