import axios from "axios"
import { AUTH_ERROR, GET_USER, LOGIN_USER } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { usertoken } from "../../helpers/UserToken"

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