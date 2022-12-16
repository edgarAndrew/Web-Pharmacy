import React,{useEffect} from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {Delete,Edit} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import {getSale,deleteSale,getAllSales,removeItem} from '../../actions/sales'
import {deleteMed,getAllMeds} from '../../actions/meds'
import {deleteUser,allUsers} from '../../actions/user'
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import Loader from '../Loader/Loader';
import './Table.css'

const CustomTable = (props) => {
  const {rows,cols,edit,remove,type,action} = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()

  const {message:medMessage,loading:medLoading} = useSelector((state)=>state.allMeds);
  const {message:saleMessage,loading:saleLoading} = useSelector((state)=>state.allSales);
  const {message:userMessage,loading:userLoading} = useSelector((state)=>state.user);
  const {cart} = useSelector((state)=>state.cart);

  const handleEdit = (e) =>{
    if(type === 'medicine'){
      const itemId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].textContent
      navigate(`/update-med/${itemId}`)
    }
      
    else if(type === 'sale'){
      const orderId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].textContent
      dispatch(getSale(orderId))
      navigate(`/view-sale/${orderId}`)
    }
  }
  const handleDelete = (e) =>{
    if(type === 'medicine'){
      const itemId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].textContent
      dispatch(deleteMed(itemId))
    }
    else if(type === 'sale'){
      const orderId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].textContent
      dispatch(deleteSale(orderId))
    }
    else if(type === 'user'){
      const userId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].textContent
      dispatch(deleteUser(userId))
    }
    else if(type === 'cart'){
      const itemId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].textContent
      const arr = cart.filter(ele=>ele.item.itemId !== Number(itemId))
      const item = cart.find(ele=>ele.item.itemId === Number(itemId))
      dispatch(removeItem(arr,item))
    }
  }
  useEffect(()=>{
    if(medMessage){
        dispatch({type:"clearMessage"})
        dispatch(getAllMeds())
        alert.success(medMessage)
    }
    if(userMessage){
      dispatch({type:"clearMessage"})
      dispatch(allUsers())
      alert.success(userMessage)
    }
    if(saleMessage){
      dispatch({type:"clearMessage"})
      dispatch(getAllSales())
      alert.success(saleMessage)
  }
  },[dispatch,medMessage,saleMessage,userMessage,alert])
  
  return (
    medLoading || saleLoading || userLoading? <Loader/> :
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"#19fc7f"}}>
          <TableRow>
            {cols.map((ele)=><TableCell align="right"><Typography variant='h6'>{ele}</Typography></TableCell>)}
            {action?<TableCell key='action' align="center"><Typography variant='h6'>Action</Typography></TableCell>:null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((ele) => (
            <TableRow
              key={ele[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                ele.map((el)=><TableCell align="right"><Typography variant='h6'>{el}</Typography></TableCell>)
              }
              {
              action?
                <TableCell align="right" id='actions'>
                  {remove?<Delete onClick={handleDelete}/>:null}
                  {edit?<Edit onClick={handleEdit}/>:null}
                </TableCell>
                :null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable