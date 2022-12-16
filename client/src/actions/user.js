import { Message } from "@mui/icons-material"
import axios from "axios"
import '../axios'

// We use double arrow functions
export const loginUser = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post("/api/v1/auth/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
        localStorage.setItem(
            'user',
            JSON.stringify({ name: data.user.userName, token: data.jwt_token })
        )
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoginFailure",
            payload:error.response.data
        })
    }    
}
export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data} = await axios.get("/api/v1/users/profile")
        dispatch({
            type:"LoadUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data
        })
    }    
}
export const logoutUser = ()=>async(dispatch)=>{
    dispatch({
        type:"LogoutUserRequest"
    })
    localStorage.removeItem("user"); 
    dispatch({
        type:"LogoutUserSuccess",
        payload:"User Logged Out"
    })
}
export const addUser = (username,email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"AddUserRequest"
        })
        const {data} = await axios.post("/api/v1/users/add",{email,password,username},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"AddUserSuccess",
            payload:data.user,
            message:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AddUserFailure",
            payload:error.response.data
        })
    }    
}
export const allUsers = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"AllUsersRequest"
        })
        const {data} = await axios.get("/api/v1/users/")
        dispatch({
            type:"AllUsersSuccess",
            payload:data.users
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"AllUsersFailure",
            payload:error.response.data
        })
    }    
}
export const deleteUser = (userId) =>async(dispatch)=>{
    try {
        dispatch({
            type:"DeleteUserRequest"
        })
        const {data} = await axios.delete(`/api/v1/users/${userId}`)
        dispatch({
            type:"DeleteUserSuccess",
            payload:data.msg
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"DeleteUserFailure",
            payload:error.response.data
        })
    }    
}