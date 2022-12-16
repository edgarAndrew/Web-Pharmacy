import axios from "axios"
import '../axios'

// We use double arrow functions
export const getAllMeds = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"allMedsRequest"
        })
        const {data} = await axios.get("/api/v1/med/")
        dispatch({
            type:"allMedsSuccess",
            payload:data.medicines
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"allMedsFailure",
            payload:error.response.data
        })
    }    
}
export const addMed = (productCode,type,title,price,totalUnits,description) => async(dispatch)=>{
    try {
        dispatch({
            type:"addMedRequest"
        })
        const {data} = await axios.post("/api/v1/med/",
        {productCode:productCode,type:type,title:title,description:description,price:Number(price),totalUnits:Number(totalUnits)},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"addMedSuccess",
            payload:data.item,
            message:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"addMedFailure",
            payload:error.response.data
        })
    }    
}
export const updateMed = (itemId,productCode,type,title,price,totalUnits,description) => async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateMedRequest"
        })
        const {data} = await axios.patch(`/api/v1/med/${itemId}`,
        {
            productCode:productCode,type:type,
            title:title,description:description,
            price:Number(price),totalUnits:Number(totalUnits)
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"UpdateMedSuccess",
            payload:data.msg,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"UpdateMedFailure",
            payload:error.response.data
        })
    }    
}
export const deleteMed = (itemId) => async(dispatch)=>{
    try {
        dispatch({
            type:"DeleteMedRequest"
        })
        const {data} = await axios.delete(`/api/v1/med/${itemId}`)
        dispatch({
            type:"DeleteMedSuccess",
            payload:data.msg,
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"DeleteMedFailure",
            payload:error.response.data
        })
    }    
}
export const searchMed = (value)=>async(dispatch)=>{
    try {
        dispatch({
            type:"SearchMedRequest"
        })
        const {data} = await axios.get(`/api/v1/med/search/?value=${value}`)
        dispatch({
            type:"SearchMedSuccess",
            payload:data.medicines
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"SearchMedFailure",
            payload:error.response.data
        })
    }    
}