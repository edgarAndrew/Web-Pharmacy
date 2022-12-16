const {connection} = require("../db/connect")

const getMedicine = (itemId) =>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * from medicines WHERE itemId=?",[itemId],
        (err,result)=>{
            if(err)
                reject()
            else{
                resolve(result)
            }
        })
    })
}
module.exports = {getMedicine}