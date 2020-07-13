//getting this to get data from databse
const User = require('../models/user');
const user = require('../models/user');
//checking 


//here we are creating users which will help us to take action when users/x, users/y so user is common
//this is for profile i.e users/profile 
module.exports.profile = function(req, res){
    // res.end(`<h1>user profile</h1>`);
    
    //now this profile is ready to be accesed from the router i.e this action is returned on this url so now i am creating new route file for users okk!!!!!
   //here we have rendered it from the view 
   return res.render('user_profile',{
       title: "profile"
   });
};

module.exports.post = function(req, res){
    res.end(`<h1>post section</h1>`);
}
//render the sign up page
module.exports.sign_up = function(req, res){
    //if user is authenticated means sign in and still he tries to go to sign-up then he will pe redirected to users/profile not sign up
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
   return res.render('users_sign_up',{
       title: "vconnect!! | sign-up"
   }); 
}
//render the sign in page
module.exports.sign_in = function(req, res){
    //if user is authenticated i.e sign in and we want to go to sign in page ot will be redirected to profile ok
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render ('users_sign_in',{
        title: "vconnect!! | sign-in"
    })
}


// and we need to get the sign up data then only we will be able to check from database
module.exports.create = function(req, res){
    //this is taking data from form
    //if password and confirm password are not same
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //if passwords are same we will try to find a emial id if it is already present in the database we will not create it
    //if it does not exist then create  but we all are checking this in the database which is on model so it is obvious to reqire that to import that
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in sign up'); return
        }

        //if user is not there we will create a new user
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating the user while signing up'); return}
//if user is created we will take him to the sign in page
                return res.redirect('/users/sign-in');
            });
        }else{
            //if user is already present then redirect to the sign up page
            return res.redirect('back');
        }
    });

}

//geting sign in data
module.exports.createSession = function(req, res){
    return res.redirect('/');
}