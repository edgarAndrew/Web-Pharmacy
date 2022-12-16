import axios from "axios"
import '../axios'

// We use double arrow functions
export const getAllSales = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"allSalesRequest"
        })
        const {data} = await axios.get("/api/v1/sale/")
        dispatch({
            type:"allSalesSuccess",
            payload:data.sales
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"allSalesFailure",
            payload:error.response.data
        })
    }    
}
export const getSale = (orderId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"getSaleRequest"
        })
        const {data} = await axios.get(`/api/v1/sale/${orderId}`)
        dispatch({
            type:"getSaleSuccess",
            payload:data.sale
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"getSaleFailure",
            payload:error.response.data
        })
    }    
}
export const searchSale = (value)=>async(dispatch)=>{
    try {
        dispatch({
            type:"searchSaleRequest"
        })
        const {data} = await axios.get(`/api/v1/sale/search/?value=${value}`)
        dispatch({
            type:"searchSaleSuccess",
            payload:data.sales
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"searchSaleFailure",
            payload:error.response.data
        })
    }    
}
export const addSale = (custName,custNumber) => async(dispatch)=>{
    try {
        dispatch({
            type:"addSaleRequest"
        })
        const {data} = await axios.post("/api/v1/sale/",
        {custName:custName,custNumber:custNumber},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"addSaleSuccess",
            payload:data.sale,
            message:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"addSaleFailure",
            payload:error.response.data
        })
    }    
}
export const deleteSale = (orderId) => async(dispatch)=>{
    try {
        dispatch({
            type:"deleteSaleRequest"
        })
        const {data} = await axios.delete(`/api/v1/sale/${orderId}`)
        dispatch({
            type:"deleteSaleSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"deleteSaleFailure",
            payload:error.response.data
        })
    }    
}
export const addToCart = (cart,orderId) => async(dispatch)=>{
    try {
        dispatch({
            type:"addToCartRequest"
        })

        const arr = []
        cart.map((ele)=>arr.push({
            'itemId':ele.item.itemId,'productCode':ele.item.productCode,
            'title':ele.item.title,'type':ele.item.type,'price':Number(ele.item.price),
            'units':Number(ele.quantity)
        }))
        
        
        const {data} = await axios.post(`/api/v1/sale/${orderId}`, arr, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        dispatch({
            type:"addToCartSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"addToCartFailure",
            payload:error.response.data
        })
    }    
}
export const addItem = (cart,item,quantity) => async(dispatch)=>{
        const temp = {item,"quantity":quantity}
        const data = [...cart,temp]
        dispatch({
            type:"addItemTable",
            payload:data,
            amount:Number(item.price) * Number(quantity)
        })
}
export const removeItem = (cart,med) => async(dispatch)=>{
    const {quantity,item} = med
    dispatch({
        type:"removeItemTable",
        payload:cart,
        amount:Number(item.price) * Number(quantity)
    })
}

export const clearCart = () => async(dispatch)=>{
    dispatch({
        type:"clearItemTable",
    })
}
