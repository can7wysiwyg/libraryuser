import axios from "axios"
import { AUTH_ERROR, FORGOT_PASSWORD, GET_USER, LOGIN_USER, REGISTER_USER, RESET_PASSWORD } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { usertoken } from "../../helpers/UserToken"




export function registerUser(data) {

    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/userroute/register `, data)

            dispatch({type: REGISTER_USER})

            alert(response.data.msg)
            window.location.href = "/login"
    

           

            
        } catch (error) {
            console.error(error)
            dispatch({type: AUTH_ERROR})
            throw error

        }

    }
}



export function loginUser(data) {

    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/userroute/login`, data)

            dispatch({type: LOGIN_USER})
    

            if(response.data.msg) {
                alert(response.data.msg)
    
            } else {
                localStorage.setItem("usertoken", response.data.usertoken)
                    window.location.href = "/"
    
            }


            


            
        } catch (error) {
            console.error(error)
            dispatch({type: AUTH_ERROR})
            throw error

        }

    }
}


export function PasswordForgot(data) {
    

    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/userroute/forgot_password`, data)

            const accessToken = response.data.accessToken

            dispatch({type: FORGOT_PASSWORD})

            if(response.data.msg) {
                alert(response.data.msg)
            } else{
                 
                localStorage.setItem('accessToken', accessToken)

          window.location.href = '/reset_password'
        
        }



           
           

            
        } catch (error) {
            console.error(error)
            dispatch({type: AUTH_ERROR})
            throw error

        }

    }
}



export function PasswordReset(data, accessToken) {
    

    return async function(dispatch) {

        try {

            const response = await axios.put(`${ApiUrl}/userroute/reset_password`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            
            dispatch({type: RESET_PASSWORD})

            alert(response.data.msg)
    window.location.href = "/login";

            
            
        } catch (error) {
            console.error(error)
            dispatch({type: AUTH_ERROR})
            throw error

        }

    }
}




export function getUser() {

    return async function(dispatch) {

        try {

            if(!usertoken || usertoken === undefined || usertoken === null) {

                return ""
            }



            const response = await axios.get(`${ApiUrl}/userroute/user`, {

                headers: {

                    Authorization: `Bearer ${usertoken}`

                }
            })

            const user = response.data.user

            dispatch({type: GET_USER, payload: user})
    

            
        } catch (error) {
            console.error(error)
            dispatch({type: AUTH_ERROR})
            throw error

        }

    }
}