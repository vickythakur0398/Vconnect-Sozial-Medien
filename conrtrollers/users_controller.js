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
    res.end(`<h1>post section</h1>`)
}