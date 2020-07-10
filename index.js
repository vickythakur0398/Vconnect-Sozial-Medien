//...1 to shoot up server we have installed npm install express so 
const express = require(`express`);
//taking functionality of express in this app
const app = express();
const port = 8000;

//...2 after creating the router we have exported that from there now for any url we are routing it to there and it bydeafault fetches index so if you want to remove /index u can
//now all the routes will be controlled from routes  
app.use(`/`, require(`./routes/index`) )


//..3 for adding html part will use view engine ejs we have installed that npm install ejs so we have tell our app to set that and describe the parth from where it is present
//these two lines are basically for setting up our view engine
app.set('view engine' ,'ejs');
app.set('views', './views');




//1.1 shooting up the server
app.listen(port, function(err){
    if(err){
        console.log(`error while hitting up the server :${err}`);
    }

    console.log(`wooh!! server is running fine on port: ${port}`);
})