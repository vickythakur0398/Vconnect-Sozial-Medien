//...1 to shoot up server we have installed npm install express so 
const express = require(`express`);
//taking functionality of express in this app
const app = express();
const port = 8000;
//..6 here we are acquiring the database which is already created in config 
const db = require('./config/mongoose');
//....5 we have have to deal with assets so we have to mention it path where it is
app.use(express.static(`./assets`));


//..7 here we are insalling the npm indtall express-session for the encryption of cookies use for session cookie we need to add a middleware whhich takes that sessioncookie and encrypts it set it after the views  
//we are acquirung it  and we need to acquire passport and local startegy also not these twoa re for encryption
const session = require('express-session');
const passport = require('passport');
const PassportLocal= require('./config/passpost-local-strategy');


//..9 so now everytime we start our server or make changes to our code our user get logout but we dont want that to happen so one way to avoid that is to store the session cookie of a user in other place so we have installed a libray fo that i.e npm install connect-mongo
//now we are acquiring it and unlike other library it requires a argument here that is session bcs we want to store the session data  and then we have to stpre that in app.use session
const MongoStore = require('connect-mongo')(session);

 
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









//..3 for adding html part will use view engine ejs we have installed that npm install ejs so we have tell our app to set that and describe the parth from where it is present
//these two lines are basically for setting up our view engine
app.set('view engine' ,'ejs');
app.set('views', './views');


//...9.1 here we are using the connect-mongo in store
//7.1 setting the middle ware for session cookies
app.use(session({
    name: 'vconnect',
    // we have to change the secret b4 deployment in production mode
    secret: 'blahsomething',
    //when ever there is a request which is not i nitialised i.e session is not started i.e user is not logged in so we dont need to store extra data in cokkies thats why we set it to false
    saveUninitialized:false,
    //in this case if identity is established & some sort of data is presnt in the session data so we do not want to save it again and again
    resave: false,
    
    //this is for the max age upto which cookie remains live after which cookie expire
    cookie:{
        // it is in millisecionds
        maxAge: (1000 * 60 * 100)
    },
    //here we have used the 9.1
    store: new MongoStore(
        {
            //we are setting up the mongoose connection so it interacts with mongoose
            //here db bcs we have exported this db from mongoose.connection from mongoose config
            mongooseConnection: db,
            autoRemove:'disabled'
        },
        //so in case we are not connected or connected so a callbackfuncn for that
        function(err){
            console.log(err || 'connect-mongo library setup ok');
        }
    )
}));
//7.2
app.use(passport.initialize());
app.use(passport.session());

//..8 so when ever app is getting initialised passport is also getting initialised and this function is called and when it is called it will check whether the session cookie is present or not
app.use(passport.setAuthenticatedUser);

//so we haev to route after this becasue it is using routes if will use early changes wont be done and error is thrown
//...2 after creating the router we have exported that from there now for any url we are routing it to there and it bydeafault fetches index so if you want to remove /index u can
//now all the routes will be controlled from routes  
app.use(`/`, require("./routes/index"));

//1.1 shooting up the server
app.listen(port, function(err){
    if(err){
        console.log(`error while hitting up the server :${err}`);
    }

    console.log(`wooh!! server is running fine on port: ${port}`);
})





