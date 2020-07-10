//read express.rouuter documentation if if you want to konow more 
//basically this index.js is the primary file where main index.js will communicate to 

const express = require(`express`);
const router = express.Router();
console.log(`router is loaded`);

// after exporting from controller
// so here we want to access the controller which which i have recently exported 
//why?? because here we have to redirect it on that url to that action then only that action wil be completed  and we are acquring that where it is kept on next line in short path and below that the action part to link 
const homeController = require(`../conrtrollers/home_controller`);
router.get('/',homeController.home);

//here i am handling the users if request come with localhost/users/x it send it to to user.js route file which will handle from there beacuse koi bhi request aati main index se to ise me aati h
router.use('/users', require(`./users`));
//for other routes u can name just from here





//we need to export it to be available to index.js once we exported this we need to tell that now all the routes i.e app.get qpp.use will be done via this module
module.exports = router;
