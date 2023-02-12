const {connection} = require('../db/connect')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError} = require('../errors');

// Utility functions
const verifyOrderId = require('../utils/verify-orderId');
const updateCount = require('../utils/update-units')
const updateCost = require("../utils/update-cost")
const {getMedicine} = require("../utils/get-item")

// controllers
const addSale = async(req,res)=>{
    const {custName,custNumber} = req.body
    const orderDate = new Date().toISOString().slice(0,10);

    if(!custName || !custNumber)
        throw new BadRequestError("'custName','custNumber' must be provided")
    
    connection.query("INSERT INTO sales (custName,custNumber,orderDate) VALUES (?,?,?)",
        [custName,custNumber,orderDate],
        (err,result)=>{
            if(err)
                res.status(StatusCodes.BAD_REQUEST).json({err})
            else{
                const orderId = result.insertId
                res.status(StatusCodes.CREATED).json(
                    {
                        msg:"Sale added",
                        sale:{orderId,orderDate,custName,custNumber}
                    }
                )
            }
        })
}

const addToCart = async(req,res)=>{
    const {orderId} = req.params
    
    // As cartId references orderId , we check if orderId exists in db
    const obj = await verifyOrderId(orderId)
    if(obj.length === 0)
        throw new BadRequestError(`no sale with orderId:${orderId}`)

    const items = req.body
    let totalAmount = 0

    items.map((ele)=>{
        const {itemId,productCode,title,type,price,units} = ele 
        if(!itemId || !units)
            throw new BadRequestError("'itemId','units' must be provided")
        connection.query("INSERT INTO cart (cartId,itemId,productCode,title,type,price,units) VALUES (?,?,?,?,?,?,?)",
            [orderId,itemId,productCode,title,type,price,units],
            async(err,result)=>{
                if(err)
                    res.status(StatusCodes.BAD_REQUEST).json({err})
                else{
                    await updateCount(itemId,units)
                    const temp = await getMedicine(itemId)
                    totalAmount += Number(temp[0].price) * Number(units)
                    await updateCost(orderId,totalAmount)
                }
        })
    })
    res.status(StatusCodes.OK).json({msg:"items added to cart successfully"})
}

const getCart = async(req,res)=>{
    const {orderId} = req.params
    const obj = await verifyOrderId(orderId)
    if(obj.length === 0)
        throw new BadRequestError(`no sale with orderId:${orderId}`)
    
    connection.query("SELECT * FROM sales INNER JOIN cart on cartId=orderId WHERE orderId=?",[orderId],
        (err,result)=>{
            if(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
            else{
                const temp = [...result]
                const items = []
                temp.forEach((ele)=>items.push({itemId:ele.itemId,productCode:ele.productCode,
                    title:ele.title,type:ele.type,price:ele.price,units:ele.units}))
                const obj = {
                    orderId:temp[0].orderId,
                    orderDate:temp[0].orderDate,
                    custName:temp[0].custName,
                    custNumber:temp[0].custNumber,
                    totalAmount:temp[0].totalAmount,
                    items:items
                }
                res.status(StatusCodes.OK).json({sale:obj})
            }
        }
    )
}
const getAllSales = async(req,res)=>{
    connection.query("SELECT * FROM sales",
        (err,result)=>{
            if(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
            else{
                const sales = [...result]
                res.status(StatusCodes.OK).json({sales:sales})
            }
        })
}
const removeSale = async(req,res)=>{
    const {orderId} = req.params
    const obj = await verifyOrderId(orderId)
    if(obj.length === 0)
        throw new BadRequestError(`no sale with orderId:${orderId}`)
    
    connection.query("DELETE from sales WHERE orderId=?",[orderId],
    (err,result)=>{
        if(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
        else
            res.status(StatusCodes.OK).json({msg:`sale with orderId:${orderId} was deleted`})
    })
}
const searchSale = async(req,res)=>{
    const {value} = req.query
    if(!value)
        throw new BadRequestError("'value' must be passed in query params")
    
    connection.query(`SELECT * FROM sales WHERE custName LIKE '${value}%'
        OR custNumber LIKE '${value}%' OR orderDate LIKE '%${value}%'`,
        (err,result)=>{
            if(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
            else{
                const items = [...result]
                res.status(StatusCodes.OK).json({"sales":items})
            }
    })
}
module.exports = {addSale,addToCart,removeSale,getAllSales,getCart,searchSale}