//this is route of user do same things
const express = require(`express`);
const router = express.Router();
//after this export is must done below

//here we have made it to acess the user_controller which we have made
//requiring path
const usersControllers = require(`../conrtrollers/users_controller`);
//taking action now
router.get('/profile', usersControllers.profile);

//till yet we havent defined what happen when /user/x will happen so we want if any request with /users come it goes to the user.js of router which will handle all of that via user controller this we have to do that in main index of router becasue main index.js is libked with that i.e whenever any request come with url it is sent there and we want if url with /user/x will come than it send it here

router.get(`/post`, usersControllers.post);
// so this is for the users/sign-in part action is  in users controller
router.get(`/sign-up` ,usersControllers.sign_up);
router.get(`/sign-in`, usersControllers.sign_in);

// this is after checking the data and this route is from the sign up form
// and we have made a controller named create to 
//post beacsuse we are sending into the database
router.post('/create', usersControllers.create);

router.post('/create-session', usersControllers.createSession);


router.get('/sign-out', usersControllers.signout);

module.exports = router;

















