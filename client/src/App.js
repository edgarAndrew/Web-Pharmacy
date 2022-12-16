import './App.css';
import {Route,Routes} from "react-router-dom"
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Allmeds from './components/Med-report/Allmeds';
import Allsales from './components/Sales-report/Allsales';
import Addmed from './components/Add-med/Addmed';
import Addsale from './components/Add-sale/Addsale';
import AddCart from './components/Add-sale/AddCart';
import UpdateMed from './components/Update-med/UpdateMed';
import ViewSale from './components/View-sale/ViewSale';
import AddUser from './components/Add-user/AddUser';
import AllUsers from './components/All-users/AllUsers';
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {loadUser} from "./actions/user"

function App() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=>state.user);

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={isAuthenticated?<Allmeds/>:<Login/>}></Route>
        <Route path='/sales' element={isAuthenticated?<Allsales/>:<Login/>}></Route>
        <Route path='/add-med' element={isAuthenticated?<Addmed/>:<Login/>}></Route>
        <Route path='/add-sale' element={isAuthenticated?<Addsale/>:<Login/>}></Route>
        <Route path='/add-sale-details' element={isAuthenticated?<AddCart/>:<Login/>}></Route>
        <Route path='/update-med/:itemId' element={isAuthenticated?<UpdateMed/>:<Login/>}></Route>
        <Route path='/view-sale/:orderId' element={isAuthenticated?<ViewSale/>:<Login/>}></Route>
        <Route path='/add-user' element={isAuthenticated?<AddUser/>:<Login/>}></Route>
        <Route path='/all-users' element={isAuthenticated?<AllUsers/>:<Login/>}></Route>
      </Routes>
    </>
  );
}

export default App;
