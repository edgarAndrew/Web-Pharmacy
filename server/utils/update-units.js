const {connection} = require("../db/connect")

const updateCount = (itemId,units)=>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE medicines SET totalUnits=totalUnits-? WHERE itemId=?",[Number(units),itemId],
        (err,result)=>{
            if(err)
                reject()
            else
                resolve()
        })
    })
}
module.exports = updateCount