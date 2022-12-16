import React,{useState} from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import logo from '../../assets/logo.png'
import {Typography} from "@mui/material"
import {Dataset,DatasetOutlined,AddBox,AddBoxOutlined,
  Assessment,AssessmentOutlined,PostAdd,PostAddOutlined,
  PersonAdd,Group,GroupOutlined, PersonAddOutlined} from '@mui/icons-material'
import Loader from '../Loader/Loader'

const Sidebar = () => {
  const [tab,setTab] = useState(window.location.pathname)
  const {user,loading} = useSelector((state)=>state.user);

  return (
    loading?<Loader/>:
    <div className="sidebar">
        <div>
          <img src={logo} alt="logo"/>
        </div>
        <Link to="/" onClick={()=>setTab("/")}>
          { tab==="/"?<Dataset style={{color:'black'}}/>:<DatasetOutlined/>}
          <Typography variant='h6'>Medicine report</Typography>
        </Link>
        <Link to="/add-med" onClick={()=>setTab("/add-med")}>
          { tab==="/add-med"?<AddBox style={{color:'black'}}/>:<AddBoxOutlined/>}
          <Typography variant='h6'>Add Medicine</Typography>
        </Link>
        <Link to="/sales" onClick={()=>setTab("/sales")}>
          { tab==="/sales"?<Assessment style={{color:'black'}}/>:<AssessmentOutlined/>}
          <Typography variant='h6'>Sales report</Typography>
        </Link>
        <Link to="/add-sale" onClick={()=>setTab("/add-sale")}>
          { tab==="/add-sale"?<PostAdd style={{color:'black'}}/>:<PostAddOutlined/>}
          <Typography variant='h6'>Add Sale</Typography>
        </Link>
        {
          user?.isAdmin === 'true' &&  
          <Link to="/add-user" onClick={()=>setTab("/add-user")}>
            { tab==="/add-user"?<PersonAdd style={{color:'black'}}/>:<PersonAddOutlined/>}
            <Typography variant='h6'>Add User</Typography>
          </Link>
        }
        {
          user?.isAdmin === 'true' &&
          <Link to="/all-users" onClick={()=>setTab("/all-users")}>
            { tab==="/all-users"?<Group style={{color:'black'}}/>:<GroupOutlined/>}
            <Typography variant='h6'>All User</Typography>
          </Link>
        }
    </div>
  )
}

export default Sidebar