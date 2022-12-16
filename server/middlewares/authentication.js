const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

// This authentication will be set in the medicine,sales,users router to all routes 
// as all routes must be protected and access must be given to only logged in users 

async function authenticationMiddleware(req,res,next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
        throw new UnauthenticatedError("No Token provided");
    
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const {userId,name,isAdmin} = payload;  // destructuring payload data
        req.user = {userId,name,isAdmin}; 
        // passing to req.user as this midddleware will pass control to controller function
        // where payload data is used to identify user
        
    }catch(err){
        throw new UnauthenticatedError("Token has been expired or invalid")
    }
    next();
}
module.exports = authenticationMiddleware;