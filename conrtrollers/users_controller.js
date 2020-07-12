//getting this to get data from databse
const User = require('../models/user');
const user = require('../models/user');

//here we are creating users which will help us to take action when users/x, users/y so user is common
//this is for profile i.e users/profile 
module.exports.profile = function(req, res){
    // res.end(`<h1>user profile</h1>`);
    //now this profile is ready to be accesed from the router i.e this action is returned on this url so now i am creating new route file for users okk!!!!!
   //here we have rendered it from the view 
//    return res.render('user_profile',{
//        title: "profile"
//    });
   //here after making the sign-up and and aoing authentication part and now we want o display the user email and user name in the profile page
   if(req.cookies.user_id){
       //if user_id i.e the cookie is present then find the details i.e email and name in this case and send it 
       //after doing this we have to update user_profile page
       User.findById(req.cookies.user_id , function(err,user){
           if(user){
                return res.render('user_profile',{
                    title: "user profile",
                    user: user
                });
           }

           return res.redirect('/users_sign_in');

       }) ;
   }else{
       return res.redirect('users/sign-in');
   }
};

module.exports.post = function(req, res){
    res.end(`<h1>post section</h1>`)
}
//render the sign up page
module.exports.sign_up = function(req, res){
   return res.render('users_sign_up',{
       title: "vconnect!! | sign-up"
   }); 
}
//render the sign in page
module.exports.sign_in = function(req, res){
    return res.render ('users_sign_in',{
        title: "vconnec!! | sign-in"
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
    //here we are going to use our create session method we are going to check if user exist if exist then check the pasword and then we store the user identity in the cookie and then we will store that cookie in the browser
    //authentication steps

    //find the user
    User.findOne({email:req.body.email},function(err, user){
        if(err){
            console.log('error in finding user in database'); return
        }
        //handle user found
        if(user){
            // so this is the case of user found 
            // if password wont matches
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // if evrything goes fine then we have to store user identity in the cookies
            // if matches than handle create session so after this we have to also create route fo profile
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{
            //if user is not found then handle this 
            return res.redirect('/back');
        }
    });
}


module.exports.signout = function(req, res){
    // user.findById({user_id: req.body.user_id})
    console.log(req.cookies);
    res.cookie('user_id', 'false');
    // res.cookie({});
    return res.redirect('/users/sign-in');
}