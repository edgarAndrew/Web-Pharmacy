import React,{useEffect} from 'react'
import {Typography,Button} from '@mui/material'
import {addSale,clearCart} from '../../actions/sales'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import {getAllMeds} from '../../actions/meds'
import {getAllSales} from '../../actions/sales'
import Loader from '../Loader/Loader'
import './Addsale.css'

const Addsale = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate()

  const {loading,message,error} = useSelector((state)=>state.allSales);
  
  useEffect(()=>{
    dispatch(getAllMeds())
    dispatch(getAllSales())
  },[dispatch])

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(addSale(document.getElementById("cust-name").value,document.getElementById("cust-num").value))
    navigate('/add-sale-details')
  }
  useEffect(()=>{
    dispatch(clearCart())
  },[dispatch])
  
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
    <div className='add-sale'>
      <form onSubmit={handleSubmit}>
        <Typography variant='h3'>Add Sale</Typography>
        <label htmlFor="cust-name"><Typography variant='h6'>Customer name</Typography></label>
        <input type="text" id='cust-name' required/><br /><br />
        <label htmlFor="cust-num"><Typography variant='h6'>Customer mobile</Typography></label>
        <input type="text" id='cust-num' required/><br /><br />
        <Button type="submit"><Typography variant='h6'>Start</Typography></Button> 
      </form>
    </div>
  )
}

export default Addsale