// a controller is a set of different action prformed on different rotute 
//we need to export a function which is publically available to the routes file
module.exports.home = function(req, res){
    return res.end(`<h1>express is up and running</h1>`)
    //after exporting this we need to acces this in routes afteralll we have created it for there 
}