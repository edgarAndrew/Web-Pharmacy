import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const allMedsReducer = createReducer(initialState,{
    allMedsRequest:(state,action)=>{
        state.loading = true
    },
    allMedsSuccess:(state,action)=>{
        state.loading = false
        state.meds = action.payload
    },
    allMedsFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    addMedRequest:(state,action)=>{
        state.loading = true
    },
    addMedSuccess:(state,action)=>{
        state.loading = false
        state.med = action.payload
        state.message = action.message
    },
    addMedFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    UpdateMedRequest:(state,action)=>{
        state.loading = true
    },
    UpdateMedSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    UpdateMedFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    DeleteMedRequest:(state,action)=>{
        state.loading = true
    },
    DeleteMedSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    DeleteMedFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    SearchMedRequest:(state,action)=>{
        state.loading = true
    },
    SearchMedSuccess:(state,action)=>{
        state.loading = false
        state.meds = action.payload
    },
    SearchMedFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearMessage:(state,action)=>{
        state.message = null
    },
    clearErrors:(state,action)=>{
        state.error = null
    }
})