import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated:false,
}
export const userReducer = createReducer(initialState,{
    
    // dispatch types or cases for reducer
    LoginRequest: (state,action)=>{
        state.loading = true;
    },
    LoginSuccess: (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state,action)=>{
          state.loading = false;     
          state.error = action.payload
          state.isAuthenticated = false;
    },

    LoadUserRequest: (state,action)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = false;
    },
    LogoutUserRequest: (state,action)=>{
        state.loading = true;
    },
    LogoutUserSuccess: (state,action)=>{
        state.loading = false
        state.user = null
        state.isAuthenticated = false;
        state.message = action.payload
    },
    LogoutUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = true;
    },
    AddUserRequest: (state,action)=>{
        state.loading = true;
    },
    AddUserSuccess: (state,action)=>{
        state.loading = false
        state.added_user = action.payload
        state.message = action.message
    },
    AddUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },
    DeleteUserRequest: (state,action)=>{
        state.loading = true;
    },
    DeleteUserSuccess: (state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    DeleteUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },
    AllUsersRequest: (state,action)=>{
        state.loading = true;
    },
    AllUsersSuccess: (state,action)=>{
        state.loading = false
        state.users = action.payload
    },
    AllUsersFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },
    clearError:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})

