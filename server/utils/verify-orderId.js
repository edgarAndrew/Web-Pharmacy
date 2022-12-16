const {connection} = require("../db/connect")

const verifyOrderId = async(orderId) =>{
    return new Promise((resolve,reject)=>{
        connection.query("SELECT * FROM sales WHERE orderId=?",[orderId],
        (err,result)=>{
            if(err)
                reject()
            else
                resolve(result)
        }
        )
    })
}

module.exports = verifyOrderId