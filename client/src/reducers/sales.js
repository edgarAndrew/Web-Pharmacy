import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const allSalesReducer = createReducer(initialState,{
    allSalesRequest:(state,action)=>{
        state.loading = true
    },
    allSalesSuccess:(state,action)=>{
        state.loading = false
        state.sales = action.payload
    },
    allSalesFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    addSaleRequest:(state,action)=>{
        state.loading = true
    },
    addSaleSuccess:(state,action)=>{
        state.loading = false
        state.sale = action.payload
        state.message = action.message
    },
    addSaleFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    getSaleRequest:(state,action)=>{
        state.loading = true
    },
    getSaleSuccess:(state,action)=>{
        state.loading = false
        state.sale = action.payload
    },
    getSaleFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    deleteSaleRequest:(state,action)=>{
        state.loading = true
    },
    deleteSaleSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    deleteSaleFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    searchSaleRequest:(state,action)=>{
        state.loading = true
    },
    searchSaleSuccess:(state,action)=>{
        state.loading = false
        state.sales = action.payload
    },
    searchSaleFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})
export const cartsReducer = createReducer({
        cart:[],
        loading:false,
        amount:0
    },{
    addItemTable:(state,action)=>{
        state.cart = action.payload
        state.amount = state.amount + action.amount
    },
    removeItemTable:(state,action)=>{
        state.cart = action.payload
        state.amount = state.amount - action.amount
    },
    clearItemTable:(state,action)=>{
        state.cart = []
        state.amount = 0
    },
    addToCartRequest:(state,action)=>{
        state.loading = true
    },
    addToCartSuccess:(state,action)=>{
        state.message = action.payload
        state.loading = false
    },
    addToCartFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})
