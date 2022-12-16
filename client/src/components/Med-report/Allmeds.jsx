import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getAllMeds,searchMed} from '../../actions/meds'
import { Typography} from '@mui/material'
import {Replay,Search} from '@mui/icons-material'
import Loader from '../Loader/Loader'
import './Allmeds.css'
import CustomTable from '../Table/CustomTable'

const Allmeds = () => {
  const dispatch = useDispatch();
  const {meds,loading} = useSelector((state)=>state.allMeds);
  const cols = ['ItemId','Product Code','Title','Type','Price','Units']
  const tuples = []
  
  if(meds){
    meds.forEach((ele)=>{
      const {itemId,productCode,title,type,price,totalUnits} = ele
      tuples.push([itemId,productCode,title,type,price,totalUnits])
    })
  }
  useEffect(()=>{
    dispatch(getAllMeds())
  },[dispatch])

  const handleSearch = () =>{
    const searchValue = document.getElementById('search').value
    dispatch(searchMed(searchValue))
  }
  const handleReload = () =>{
    dispatch(getAllMeds())
  }

  return (
    loading?<Loader/>:
    <div className='container'>
      <Typography variant='h3'>Medicine report</Typography>
      <div className='search-box'>
        <input placeholder='Search by code, title, type, id' type="text" id='search'/>
        <Search onClick={handleSearch}/>
      </div>
      <div className='table'>
        <Replay onClick={handleReload}/>
        <CustomTable rows={tuples} cols={cols} action={true} remove={true} edit={true} type={'medicine'}/>
      </div>
    </div>
  )
}

export default Allmeds