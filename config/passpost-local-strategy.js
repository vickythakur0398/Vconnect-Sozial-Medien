// this is we are doing via passport library which is a middleware already installed npm install passsport along with it we have aslo installed the passport strategy local as we are using local 
const passport = require('passport');
//we also need to acquire that passport local and strategy also
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authentication we are doing via passport 
//we need to acquire user so we need to tell the passport to use the LocalStrategy which we have created
passport.use(new LocalStrategy({
    // weh have to put here from the user schema which has been already created there email is a field
    usernameField: 'email'
    },
    // if email is called then this fuction will be called 
    // here done is a funcn and inbuilt to passport and automatically called and is callback function and we can name it anything
    function(email, password, done){
        //find user and establish the identity fot this we have to get user 
        User.findOne({email:email}, function(err,user){
            //if error in finding user
            if(err){
                console.log('error in finding user >>>>> passport');
                //done can takes 2 arguments also
                return done(err);

            }

            //if user is found and password wont matches 

            if(!user || user.password != password){
                console.log('INVALID USERNAME/PASSWORD ');
                //THERE IS no error but user is not found so done takes two argument one is err here error is no so null and authentication is not been done so it is false
                return done(null, false);
            }

            //if the user is found
            return done(null,user);
        });
    }
));


// we need a serialise user function and deserialise user function serialising is when in manual authentication we are accesing the user_id to store in the cookie and then the cookie is sent back to the server and we need to establish the identity of that user from the database that id is to deseralise

//serialising the user to decide which key is to be kept in th cookies
//this automatically encrypts the cookie sent it to the browser and encryption is not done by the passport we have to install a library i.e expres-session fo that and we have done that in main index.js
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//dserialising the user from the key in the cookies
// so here broweser make the request so we need to deserialise it and find the user again
passport.deserializeUser(function(id, done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user from cookie >>> passport');
            return done(err);
        }
//if no error so null then we have no error and user is found
        return done(null,user);
    });
});

//now we will send data of the current user to the views
//check if user is authenticated 
passport.checkAuthentication = function(req, res, next){
    //if request is autheticated or not 
    // this detect user is sign in or not if not signed in no need to show user info on view redirected to sign in and if user is signed in pass the request to next function i.e (controller's action)
    if (req.isAuthenticated()){

        return next();
        
    }
 
    //if the user is not signed in 
    return res.redirect('/users/sign-in')
}

//once the user is sign in we have to set the views for user
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //so wheenver the user is signed in the details are available in the user because we have used user model
        //req.user contains the current signed in user form the session cookie and we are just sending this to the local for the views then we have to go to route user there only we can send 
        res.locals.user = req.user;
    }
    next();
}


module.exports  = passport;