import React,{useState,useEffect} from 'react'
import "./Login.css"
import {Typography,Button} from "@mui/material"
import logo from "../../assets/logo2.png"
import { useDispatch,useSelector } from 'react-redux'
import {loginUser} from '../../actions/user'
import Loader from '../Loader/Loader'
import {useAlert} from 'react-alert'

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert()

  const { message,error,loading } = useSelector((state) => state.user);

  const loginHandler = (e)=>{
    e.preventDefault();
    dispatch(loginUser(email,password))
  }

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearError" })
      alert.error(error.msg)
    }
    if(message){
      dispatch({ type: "clearMessage" })
      alert.success(message)
    }
  }, [dispatch, error, alert,message]);

  return (
    loading ? <Loader/> :
    <div className='login'>
      <form className='loginForm' onSubmit={loginHandler}>
        <img src={logo} alt="logo"/>
          <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button type="submit"><Typography>Login</Typography></Button>
      </form>
    </div>
  )
}

export default Login