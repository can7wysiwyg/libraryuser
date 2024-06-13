import { AUTH_ERROR, FORGOT_PASSWORD, GET_USER, LOGIN_USER, REGISTER_USER } from "../actions/types";

export function authRdcr(state={}, action) {

    switch(action.type) {

        case LOGIN_USER:
            return{...state, authenticated: true}

        case REGISTER_USER:
            return{...state, msg: "success"}  
            
        case FORGOT_PASSWORD:
            return{...state, msg: "success"}    

        case GET_USER:
            return{...state, user: action.payload}
            
        case AUTH_ERROR:
            return{...state, error: "there was a problem"}
            
        default:
            return state    

    }
}