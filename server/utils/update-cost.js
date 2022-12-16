const {connection} = require("../db/connect")

const updateCost = (orderId,amount) =>{
    return new Promise((resolve,reject)=>{
        connection.query("UPDATE sales SET totalAmount=? WHERE orderId=?",[amount,orderId],
        (err,result)=>{
            if(err)
                reject()
            else
                resolve()
        })
    })
}
module.exports = updateCost