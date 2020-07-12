//this is route of user do same things
const express = require(`express`);
const router = express.Router();
//after this export is must done below

// after we want to it by passport way
const passport = require('passport');

//here we have made it to acess the user_controller which we have made
//requiring path
const usersControllers = require(`../conrtrollers/users_controller`);
const { checkAuthentication } = require('../config/passpost-local-strategy');
//taking action now
//now we are changing it act to passport 
//so if user is not signed in checkAuthentication function in our passport
router.get('/profile',passport.checkAuthentication, usersControllers.profile);

//till yet we havent defined what happen when /user/x will happen so we want if any request with /users come it goes to the user.js of router which will handle all of that via user controller this we have to do that in main index of router becasue main index.js is libked with that i.e whenever any request come with url it is sent there and we want if url with /user/x will come than it send it here

router.get(`/post`, usersControllers.post);
// so this is for the users/sign-in part action is  in users controller
router.get(`/sign-up` ,usersControllers.sign_up);
router.get(`/sign-in`, usersControllers.sign_in);

// this is after checking the data and this route is from the sign up form
// and we have made a controller named create to 
//post beacsuse we are sending into the database
router.post('/create', usersControllers.create);
// router.post('/create-session', usersControllers.);

//for create-seesion
//use passport as a middleware to authenticate
//it can take 3 argument
router.post('/create-session', passport.authenticate(
    // so here passport first autheticate this and if authentication is done then only is wen tto the controller action that i the one of use of middleware a.c.t me
    'local',
    {failureRedirect: '/users/sign-in'},

), usersControllers.createSession);

module.exports = router;

















