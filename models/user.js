// after connecting to the data base we are making schema for manual authentication 
//so first step for creating a schema is to acquire mongoose
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
//so here we are describing all the fields
//now each user has a email and each email should be unique and so the password
//SO WE are declaring various sub properties of schema as an object

        email: {
         type:String,
         //so its must to mention email
         required:true,
         //and email should unique
         unique:true
        },

        password:{
          type:String,
          required:true  
        },

        name: {
            type:String,
            required:true
        }
 
        // so along with that we need to jnow when was the user is created and when was the user last updated
        //so mongoose manages that createdat like if we make a new email it will keep track by createdat and if we change a name so that will be taken care by updatedat
        //so monggose willl do that by timestamps


},{

    timestamps:true
});
//telling mongoose that it is a collection and it refers to userSchema
const user = mongoose.model('User', userSchema);


// finally we need to export that
module.exports= user ;