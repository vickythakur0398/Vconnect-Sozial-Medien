//read express.rouuter documentation if if you want to konow more 
//basically this index.js is the primary file where main index.js will communicate to 

const express = require(`express`);
const router = express.Router();
console.log(`router is loaded`);

// so here we want to access the controller which which i have recently exported 
//why?? because here we have to redirect it on that url to that action then only that action wil be completed  and we are acuring that where it is kept on next line and below that the action part to link on the link
const homeController = require(`../conrtrollers/home_controller`);
router.get('/',homeController.home);


//we need to export it to be available to index.js once we exported this we need to tell that now all the routes i.e app.get qpp.use will be done via this module
module.exports = router;
