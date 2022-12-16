import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getAllSales,searchSale} from '../../actions/sales'
import CustomTable from '../Table/CustomTable'
import { Typography } from '@mui/material'
import {Replay,Search} from '@mui/icons-material'
import Loader from '../Loader/Loader'
import './Allsales.css'

const Allsales = () => {
  const dispatch = useDispatch();
  const {sales,loading} = useSelector((state)=>state.allSales);
  const cols = ['OrderId','Order Date','Customer Name','Customer Mobile','Amount']
  const tuples = []

  if(sales){
    sales.forEach((ele)=>{
      const {orderId,orderDate,custName,custNumber,totalAmount} = ele
      tuples.push([orderId,orderDate.slice(0,10),custName,custNumber,totalAmount])
    })
  }

  useEffect(()=>{
    dispatch(getAllSales())
  },[dispatch])

  const handleSearch = () =>{
    const searchValue = document.getElementById('search').value
    dispatch(searchSale(searchValue))
  }
  const handleReload = () =>{
    dispatch(getAllSales())
  }

  return (
    loading?<Loader/>:
    <div className='container'>
      <Typography variant='h3'>Sales report</Typography>
      <div className='search-box'>
        <input placeholder='Search by name, mobile, date, id' type="text" id='search'/>
        <Search onClick={handleSearch}/>
      </div>
      <div className='table'>
        <Replay onClick={handleReload}/>
        <CustomTable rows={tuples} cols={cols} action={true} remove={true} edit={true} type={'sale'}/>
      </div>
    </div>
  )
}

export default Allsales