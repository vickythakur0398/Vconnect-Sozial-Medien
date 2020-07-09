//...1 to shoot up server we have installed npm install express so 
const express = require(`express`);
//taking functionality of express in this app
const app = express();
const port = 8000;

//...2 after creating the router we have exported that from there now for any url we are routing it to there and it bydeafault fteches index so if you want to remove /index u can
app.use(`/`, require(`./routes/index`) )


//1.1 shooting up the server
app.listen(port, function(err){
    if(err){
        console.log(`error while hitting up the server :${err}`);
    }

    console.log(`wooh!! server is running fine on port: ${port}`);
})