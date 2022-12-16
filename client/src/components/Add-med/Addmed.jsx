import React,{useEffect} from 'react'
import {Typography,Button} from '@mui/material'
import {addMed,getAllMeds} from '../../actions/meds'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'
import './Addmed.css'

const Addmed = () => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const {loading,message,error} = useSelector((state)=>state.allMeds);

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(addMed(
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
    <div className='add-med'>
        <form onSubmit={handleSubmit}>
        <Typography variant='h3'>Add Medicine</Typography>
            <div>
                <div className='group'>
                    <div>
                        <label htmlFor="product-code"><Typography variant='h6'>Code</Typography></label>
                        <input type="text" id="product-code" required/>
                    </div>           
                    <div>
                        <label htmlFor="title"><Typography variant='h6'>Title</Typography></label>
                        <input type="text" id="title" required/>
                    </div>
                    <div>
                        <label htmlFor="type"><Typography variant='h6'>Type</Typography></label>
                        <input type="text" id="type" required/>
                    </div>
                </div>
                <div className='group'>
                    <div>
                        <label htmlFor="price"><Typography variant='h6'>Price</Typography></label>
                        <input type="number" id="price" required/>
                    </div>
                    <div>
                        <label htmlFor="total-units"><Typography variant='h6'>Units</Typography></label>
                        <input type="number" id="total-units" required/>
                    </div>
                    <div>
                        <label htmlFor="description"><Typography variant='h6'>Description</Typography></label>
                        <textarea rows="5" cols="33" id="description"></textarea>
                    </div>   
                </div>
            </div>
            <Button disabled={loading} type="submit"><Typography variant='h6'>Done</Typography></Button> 
        </form>
    </div>
  )
}

export default Addmed