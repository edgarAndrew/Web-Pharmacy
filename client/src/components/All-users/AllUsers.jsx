import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {allUsers} from '../../actions/user'
import CustomTable from '../Table/CustomTable'
import { Typography } from '@mui/material'
import Loader from '../Loader/Loader'
import './AllUsers.css'

const AllUsers = () => {
    const dispatch = useDispatch();
  const {users,loading} = useSelector((state)=>state.user);
  const cols = ['userId','Username','Email']
  const tuples = []

  if(users){
    users.forEach((ele)=>{
      const {userId,username,email} = ele
      tuples.push([userId,username,email])
    })
  }
  useEffect(()=>{
    dispatch(allUsers())
  },[dispatch])

  return (
    loading?<Loader/>:
    <div className='container'>
      <Typography variant='h3'>Users</Typography>
      <div className='table'>
        <CustomTable rows={tuples} cols={cols} action={true} remove={true} edit={false} type={'user'}/>
      </div>
    </div>
  )
}

export default AllUsers