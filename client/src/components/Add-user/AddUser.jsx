import React,{useEffect} from 'react'
import {Typography,Button} from '@mui/material'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import {addUser} from '../../actions/user'
import Loader from '../Loader/Loader'
import './AddUser.css'
const AddUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert()

    const {loading,message,error} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(error){
            dispatch({type:"clearErrors"})
            alert.error(error.error.sqlMessage)
        }
    },[dispatch,alert,error])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(addUser(document.getElementById("username").value,document.getElementById("email").value,
            document.getElementById("pass").value))
        if(message){
          dispatch({type:"clearMessage"})
          alert.info(message)
        }
    }

  return (
    loading?<Loader/>:
    <div className='add-user'>
      <form onSubmit={handleSubmit}>
        <Typography variant='h3'>Add User</Typography>
        <label htmlFor="username"><Typography variant='h6'>Username</Typography></label>
        <input type="text" id='username' required/><br /><br />
        <label htmlFor="email"><Typography variant='h6'>Email</Typography></label>
        <input type="text" id='email' required/><br /><br />
        <label htmlFor="pass"><Typography variant='h6'>Password</Typography></label>
        <input type="password" id='pass' required/><br /><br />
        <Button type="submit"><Typography variant='h6'>Done</Typography></Button> 
      </form>
    </div>
  )
}

export default AddUser