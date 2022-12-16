import { configureStore } from "@reduxjs/toolkit"
import {userReducer} from './reducers/users'
import {allMedsReducer} from './reducers/meds'
import {allSalesReducer,cartsReducer} from './reducers/sales'

const store = configureStore({
    reducer:{
        user:userReducer,
        allMeds:allMedsReducer,
        allSales:allSalesReducer,
        cart:cartsReducer
    }
})
export default store