// after installing mongodb and mongoose
const mongoose = require('mongoose');
// providing connection to the database and this takes only one request it is now in developement phase and running on our local system
mongoose.connect('mongodb://localhost/vconnect_developement');

//connecting to the databse
const db = mongoose.connection;
//if error on connecting
db.on('error', console.error.bind(console,'error connecting to mongodb'))
// if not any error we have given a callback function
db.once('open' , function(){
    console.log('connected to mongodb database');
});


//now exporting and then just place it in main index
module.exports = db;



// ho gaya ys tha error  hwaaaha  dkou=dbkil:  D:IKh gya  :: 2  the ye  thnyxes 