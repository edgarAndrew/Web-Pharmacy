import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import {Button} from '@mui/material'
import {addItem,addToCart} from '../../actions/sales'
import { Typography } from '@mui/material'
import CustomTable from '../Table/CustomTable'
import Loader from '../Loader/Loader'
import './AddCart.css'

const AddCart = () => {
    const {loading:saleLoading,sale,error} = useSelector((state)=>state.allSales);
    const {meds,loading:medLoading} = useSelector((state)=>state.allMeds)
    const {cart,message,loading:cartLoading,error:cartError,amount} = useSelector((state)=>state.cart)

    const [save,setSave] = useState(false)
    const dispatch = useDispatch();
    const alert = useAlert()

    const cols = ['ItemId','Product Code','Type','Title','Price','Units']
    const tuples = []

    if(cart){
        cart.forEach((ele)=>{
            const {item,quantity} = ele
            tuples.push([item.itemId,item.productCode,item.type,item.title,item.price,quantity])
        })
    }
    
    useEffect(()=>{
        if(error || cartError){
            dispatch({type:"clearErrors"})
            alert.error(error.msg)
        }
        if(message){
            dispatch({type:"clearMessage"})
            alert.success(message)
        }
    },[dispatch,error,message,alert,cartError])

    const handleAdd = (e) =>{
        e.preventDefault()
        const temp = (document.getElementById('med-type').value).split('-')
        const item = meds.find(ele=>ele.itemId === Number(temp[0]))
        const quantity = document.getElementById('quantity').value
        if(Number(quantity) <= item.totalUnits){
            dispatch(addItem(cart,item,quantity))
        }else{
            alert.info("Insufficient Stock")
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(addToCart(cart,sale.orderId))
        setSave(save?false:true)
    }
    
    return (
        medLoading||saleLoading||cartLoading?<Loader/>:
        <div className='container'>
            <Typography variant='h4'>Sale Details</Typography>
            <div className='cust-details'>
                <div>
                    <Typography variant='h6'>Order Id : {sale.orderId}</Typography>
                    <Typography variant='h6'>Order Date : {sale.orderDate}</Typography>
                </div>
                <div>
                    <Typography variant='h6'>Customer name : {sale.custName}</Typography>
                    <Typography variant='h6'>Customer mobile : {sale.custNumber}</Typography>
                </div>
            </div>
            <div className='item-details'>
                <Typography variant='h4'>Add Items</Typography>
                <form onSubmit={handleAdd}>
                    <div>
                        <label htmlFor="med-type"><Typography variant='h6'>Item</Typography></label>
                        <select name="med-name" id="med-type" required>
                        {
                            meds.map((ele)=>
                                <option value={`${ele.itemId}-${ele.title}`}>{ele.itemId}-{ele.title}</option>
                            )
                        }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='quantity' ><Typography variant='h6'>Quantity</Typography></label>
                        <input type="number" id='quantity' required/>
                    </div>
                    <Button type="submit" disabled={save}>
                        <Typography variant='h6'>Add</Typography>
                    </Button> 
                </form>
            </div>
            <div className='cart-details'>
                <Typography variant='h4'>Sale Cart</Typography>
                <form onSubmit={handleSubmit}>
                    {/* {cart.map((ele)=>ele.item.title)} */}
                    <CustomTable rows={tuples} cols={cols} action={true} remove={true} edit={false} type={'cart'}/>
                    <Typography sx={{fontWeight: 'bold'}} variant='h6'>Amount:{amount}</Typography>
                    <Button variant='outlined' disabled={save} type="submit">
                        <Typography variant='h6'>Save</Typography>
                    </Button>
                </form>
            </div>
        </div>
  )
}

export default AddCart