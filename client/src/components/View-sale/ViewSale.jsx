import React from 'react'
import {useSelector} from "react-redux"
import { Typography } from '@mui/material'
import CustomTable from '../Table/CustomTable'
import Loader from '../Loader/Loader'
import './ViewSale.css'

const ViewSale = () => {
    const {sale,loading} = useSelector((state)=>state.allSales);

    const items = sale ? sale.items : null

    const cols = ['ItemId','Product Code','Title','Type','Price','Units']
    const tuples = []

    if(items){
        items.forEach((ele)=>{
            const {itemId,productCode,type,title,price,units} = ele
            tuples.push([itemId,productCode,title,type,price,units])
        })
    }
  return (
    loading ?<Loader/>:
    <div className='container'>
            <Typography variant='h4'>Sale Details</Typography>
            <div className='cust-details'>
                <div>
                    <Typography variant='h6'>Order Id : {sale?.orderId}</Typography>
                    <Typography variant='h6'>Order Date : {sale?.orderDate.slice(0,19)}</Typography>
                </div>
                <div>
                    <Typography variant='h6'>Customer name : {sale?.custName}</Typography>
                    <Typography variant='h6'>Customer mobile : {sale?.custNumber}</Typography>
                </div>
            </div>
            <div className='cart-details'>
                <Typography variant='h4'>Sale Cart</Typography>
                <form>
                    <CustomTable rows={tuples} cols={cols} edit={false}/>
                </form>
                <Typography sx={{fontWeight: 'bold'}} variant='h6'>Amount:{sale?.totalAmount}</Typography>
            </div>
        </div>
  )
}

export default ViewSale