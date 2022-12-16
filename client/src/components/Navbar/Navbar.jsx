import React,{useContext,useState} from 'react'
import './Navbar.css'
import {useDispatch, useSelector} from "react-redux"
import {DensityMedium,ArrowBack,Logout,ManageAccounts,AccountCircle} from "@mui/icons-material"
import {Typography} from '@mui/material'
import {logoutUser} from '../../actions/user'
import { MenuContext } from 'react-flexible-sliding-menu';
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader'

const Navbar = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const [isClicked,setClicked] = useState(false)
    const [isDropdownOpen , setDropdownOpen ] = useState('hide');

    const { toggleMenu } = useContext(MenuContext);
    const {isAuthenticated,user,loading,message} = useSelector((state)=>state.user);
      
    const handleClick = () =>{
        !isClicked?setClicked(true):setClicked(false)
        toggleMenu()
    }
    const toggleDropDown = () => {
    isDropdownOpen === 'show' ? setDropdownOpen('hide') : setDropdownOpen('show')
    }
    const handleLogout = () =>{
      toggleDropDown()
      dispatch(logoutUser())
      if(message){
        dispatch({ type: "clearMessage" })
        alert.success(message)
      }
    }

  return (
    isAuthenticated?(
      loading?<Loader/>:
        <div className='nav-bar'>
          {!isClicked?<DensityMedium onClick={handleClick}/>: <ArrowBack onClick={handleClick}/> }
          <div>
            <ManageAccounts onClick={toggleDropDown}/>
            {isDropdownOpen==='show'?
              <div className={isDropdownOpen}>
                <div>
                  <AccountCircle/>
                  <Typography variant='h6'>{user?.userName}</Typography>
                </div>
                <div onClick={handleLogout}>
                  <Logout/>
                  <Typography variant='h6'>Logout</Typography>
                </div>
              </div>
              :
              <div className={isDropdownOpen}></div>
            }
          </div>
        </div>
    ):null
  )
}

export default Navbar