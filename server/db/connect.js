const mysql = require('mysql')
require('dotenv').config();

//Development DB
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port:process.env.PORT,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
})

const connectDB = () =>{
    return new Promise((resolve,reject)=>{
        connection.connect(function(err){
            if(err){
                console.log('Could not connect to DB')
                reject(err)
            }
            resolve(connection);
        })
    })
}

module.exports = {connection,connectDB}