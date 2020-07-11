//...1 to shoot up server we have installed npm install express so 
const express = require(`express`);
//taking functionality of express in this app
const app = express();
const port = 8000;
//..6 here we are acquiring the database which is already created in config 
const db = require('./config/mongoose');
//....5 we have have to deal with assets so we have to mention it path where it is
app.use(express.static(`./assets`));




//..6 so after insatlling the cookie parser to read and write the cookies we to acquire it and we nee dto tell the app to use it
const cookieParser = require(`cookie-parser`);
app.use(cookieParser());

// this is to reading  through the post request as we do
app.use(express.urlencoded());

//...4 now we are making the layout so we have installed npm install express-ejs-layouts so we have to acquire it and use it 
//we are using it before routes because in routes we are rendering on url so it is obvious we have to use it before that.\
const expressLayouts = require(`express-ejs-layouts`);
app.use(expressLayouts);


//...6 here we want that our link tag of individual pages must not appear in the body of that we want whenever this express ejs layout is rendering our layout.ejs(name of that layout) with the code we want our link set up in the head of that layout thats what we are doing here!!!
//extract styles and script from the sub pages into the layout after this step we need to go to layout.ejs where our layout file is and wherever we want to render this extracted link put that there <%- styles%> in head or script in body
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);








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





// bolo chal nhi rha ye restart krke dekha? vs code yes nhi