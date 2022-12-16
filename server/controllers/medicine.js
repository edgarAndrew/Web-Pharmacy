const {connection} = require('../db/connect')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError} = require('../errors');
const {getMedicine} = require("../utils/get-item")

const addMedicine = async(req,res)=>{
    const {productCode,title,type,price,totalUnits,description} = req.body
    
    if(!productCode || !title || !type || !price || !totalUnits || !description)
        throw new BadRequestError("'productCode','title','type','price','totalUnits','description' must be provided")
    
    connection.query("INSERT INTO medicines (productCode,title,type,price,totalUnits,description) VALUES (?,?,?,?,?,?)",
        [productCode,title,type,price,totalUnits,description],
        (err,result)=>{
            if(err)
                res.status(StatusCodes.BAD_REQUEST).json({err})
            else{
                const itemId = result.insertId
                res.status(StatusCodes.CREATED).json(
                    {
                        msg:"Medicine added",
                        item:{itemId,productCode,title,type,price,totalUnits,description}
                    }
                )
            }
        })
}
const removeMedicine = async(req,res)=>{
    const {id} = req.params

    connection.query("DELETE FROM medicines where itemId=?",[id],
        (err,result)=>{
            if(err)
                res.status(StatusCodes.BAD_REQUEST).json({err})
            else{
                if(result.affectedRows === 1)
                    res.status(StatusCodes.OK).json({msg:"Medicine deleted"})
                else
                    res.status(StatusCodes.BAD_REQUEST).json({msg:`No medicine with itemId:${id}`})
            }
        })
}
const updateMedicine = async(req,res)=>{
    const {id} = req.params
    const {productCode,title,type,price,totalUnits,description} = req.body

    if(!productCode || !title || !type || !price || !totalUnits || !description)
        throw new BadRequestError("'productCode','title','type','price','totalUnits','description' must be provided")
    
    connection.query("UPDATE medicines SET productCode=?,title=?,type=?,price=?,totalUnits=?,description=? WHERE itemId=?",
        [productCode,title,type,price,totalUnits,description,id],
        (err,result)=>{
            if(err)
                res.status(StatusCodes.BAD_REQUEST).json({err})
            else{
                if(result.affectedRows === 1)
                    res.status(StatusCodes.OK).json({msg:"Medicine Updated"})
                else
                    res.status(StatusCodes.BAD_REQUEST).json({msg:`No medicine with itemId:${id}`})
            }
        })

}
const getMedicineInfo = async(req,res)=>{
    const {id} = req.params
    const item = await getMedicine(id)
    res.status(StatusCodes.OK).json(item[0])
    
}
const getAllMeds = async(req,res)=>{
    connection.query("SELECT * FROM medicines",
        (err,result)=>{
            if(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
            else{
                const meds = [...result]
                res.status(StatusCodes.OK).json({medicines:meds})
            }
        })
}
const searchMed = async(req,res)=>{
    const {value} = req.query
    if(!value)
        throw new BadRequestError("'value' must be passed in query params")
    
    connection.query(`SELECT * FROM medicines WHERE title LIKE '%${value}%'
        OR type LIKE '%${value}%' OR productCode LIKE '%${value}%' OR itemId LIKE '%${value}%'`,
        (err,result)=>{
            if(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
            else{
                const items = [...result]
                res.status(StatusCodes.OK).json({"medicines":items})
            }
    })
}

module.exports = {addMedicine,removeMedicine,updateMedicine,getAllMeds,getMedicineInfo,searchMed}