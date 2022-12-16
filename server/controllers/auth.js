const {connection} = require('../db/connect')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { BadRequestError} = require('../errors');

const login = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password)
        throw new BadRequestError("provide 'email','password' in request body")
    
    connection.query("SELECT * from users WHERE email=?",[email],async(err,result)=>{
        if(err)
            res.status(StatusCodes.BAD_REQUEST).json({err})
        else if (result.length === 0)
            res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid Credentials"})
        else{
            // since email is email is unique the result will have only 1 tuple
            const {userId,userName,password:userPassword,isAdmin} = result[0]

            // comparing password with hash password 
            const passCorrect = await bcrypt.compare(password,userPassword) // returns a promise
            
            if (!passCorrect)
                res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid Credentials"})
            
            else{
                const token = jwt.sign({userId:userId,name:userName,isAdmin:isAdmin},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
                res.status(StatusCodes.ACCEPTED).json({msg:"User logged in",user:{userName,userId,email,isAdmin},jwt_token:token})
            }
        }      
    })
}

module.exports = {login}

