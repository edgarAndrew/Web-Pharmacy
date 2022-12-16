const {connection} = require('../db/connect')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')

const { BadRequestError,UnauthenticatedError} = require('../errors');

const addUser = async(req,res) =>{
    const {username,email,password} = req.body;
    const {isAdmin} = req.user

    if(isAdmin === 'false')
        throw new UnauthenticatedError("Only admin can add users")
    
    if(!username || !email || !password)
        throw new BadRequestError("provide 'username','email','password' in request body")
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    
    connection.query("INSERT INTO users (userName,email,password,isAdmin) VALUES(?,?,?,?)",
        [username,email,hashPassword,'false'],
        (error,result)=>{
            if(error){
                res.status(StatusCodes.BAD_REQUEST).json({error})
            }else{
                const userId = result.insertId
                res.status(StatusCodes.CREATED).json({msg:"User created",user:{userId,username,email}})
            }
    })
}
const deleteUser = async(req,res)=>{
    const {isAdmin,userId} = req.user

    if(isAdmin === 'false')
        throw new UnauthenticatedError("Only admin can delete users")
    
    const {id} = req.params

    if(userId == id)
        throw new BadRequestError("Admin cant be deleted, contact database admin")

    connection.query("DELETE FROM users where userId=?",[id],
        (err,result)=>{
            if(err){
                res.status(StatusCodes.BAD_REQUEST).json({err})
            }
            else{
                if(result.affectedRows === 1)
                    res.status(StatusCodes.OK).json({msg:`UserId:${userId} has been deleted`})
                else
                    res.status(StatusCodes.BAD_REQUEST).json({msg:`No user with userId:${userId}`})
            }
        })
}
const getAllUsers = async(req,res)=>{
    const {isAdmin} = req.user
    if(isAdmin === 'false')
        throw new UnauthenticatedError("Only admin can get all users")
    
    const users = []
    connection.query("SELECT * FROM users",
        (err,result)=>{
            if(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
            else{
                result.map((ele)=>{
                    users.push({userId:ele.userId,username:ele.userName,email:ele.email,isAdmin:ele.isAdmin})
                })
                res.status(StatusCodes.OK).json({users:users})
            }
        })
    
}
const getCurrentUser = async(req,res)=>{
    const {userId} = req.user
    connection.query("SELECT * FROM users WHERE userId=?",[userId],
    (err,result)=>{
        if(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
        else{
            const {userName,email,isAdmin} = result[0]
            res.status(StatusCodes.OK).json({userName,userId,email,isAdmin})
        }
    })
}

module.exports = {addUser,deleteUser,getAllUsers,getCurrentUser}