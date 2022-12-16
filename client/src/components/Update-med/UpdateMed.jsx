import React,{useEffect} from 'react'
import {Typography,Button} from '@mui/material'
import {updateMed,getAllMeds} from '../../actions/meds'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import {useParams} from 'react-router-dom'
import Loader from '../Loader/Loader'
import './UpdateMed.css'

const UpdateMed = () => {
    const {itemId} = useParams()
    const dispatch = useDispatch();
    const alert = useAlert()
    const {loading,meds,message,error} = useSelector((state)=>state.allMeds);

    const obj = meds.find((ele)=>ele.itemId == itemId)
    const {productCode,title,type,price,totalUnits,description} = obj

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(updateMed(
            itemId,
            document.getElementById("product-code").value,
            document.getElementById("type").value,
            document.getElementById("title").value,
            document.getElementById("price").value,
            document.getElementById("total-units").value,
            document.getElementById("description").value,
        ))
        dispatch(getAllMeds())
    }
    useEffect(()=>{
        if(error){
            dispatch({type:"clearErrors"})
            alert.error(error.msg)
        }
        if(message){
            dispatch({type:"clearMessage"})
            alert.success(message)
        }
    },[dispatch,error,message,alert])

  return (
    loading?<Loader/>:
    <div className='update-med'>
        <form onSubmit={handleSubmit}>
            <Typography variant='h3'>Update Medicine</Typography>
            <div>
                <div className='group'>
                    <div>
                        <label htmlFor="product-code"><Typography variant='h6'>Code</Typography></label>
                        <input type="text" id="product-code" defaultValue={productCode} required/>
                    </div>           
                    <div>
                        <label htmlFor="title"><Typography variant='h6'>Title</Typography></label>
                        <input type="text" id="title" defaultValue={title} required/>
                    </div>
                    <div>
                        <label htmlFor="type"><Typography variant='h6'>Type</Typography></label>
                        <input type="text" id="type" defaultValue={type} required/>
                    </div>
                </div>
                <div className='group'>
                    <div>
                        <label htmlFor="price"><Typography variant='h6'>Price</Typography></label>
                        <input type="number" id="price" defaultValue={price} required/>
                    </div>
                    <div>
                        <label htmlFor="total-units"><Typography variant='h6'>Units</Typography></label>
                        <input type="number" id="total-units" defaultValue={totalUnits} required/>
                    </div>
                    <div>
                        <label htmlFor="description"><Typography variant='h6'>Description</Typography></label>
                        <textarea rows="5" cols="33" id="description" defaultValue={description}></textarea>
                    </div>   
                </div>
            </div>
            <Button disabled={loading} variant='outlined' type="submit"><Typography variant='h6'>Done</Typography></Button> 
        </form>
    </div>
  )
}

export default UpdateMed