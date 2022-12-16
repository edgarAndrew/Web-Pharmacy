const mysql = require('mysql')
require('dotenv').config();

//Development DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:'3306',
    database:'project',
    password:''
})

// Production DB
// const connection = mysql.createPool({
//     connectionLimit:100,
//     connectTimeout:60 * 60 * 1000,
//     acquireTimeout:60 * 60 * 1000,
//     waitForConnections:true,
//     timeout:60 * 60 * 1000,
//     host: process.env.HOST,
//     user: process.env.USER,
//     port:process.env.PORT,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE
// })
// connection.on('acquire',function(connection){
//     console.log('Connection %d acquired',connection.threadId);
// });
// connection.on('enqueue',function(){
//     console.log('Waiting for available connection slot');
// });
// connection.on('release',function(connection){
//     console.log('Connection %d released',connection.threadId);
// });


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