//read express.rouuter documentation if if you want to konow more 
//basically this index.js is the primary file where main index.js will communicate to 

const express = require(`express`);
const router = express.Router();
console.log(`router is loaded`);


//we need to export it to be available to index.js once we exported this we need to tell that now all the routes i.e app.get qpp.use will be done via this module
module.exports = router;
