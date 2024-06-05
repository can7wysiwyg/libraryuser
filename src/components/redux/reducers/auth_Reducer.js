import { AUTH_ERROR, GET_USER, LOGIN_USER } from "../actions/types";

export function authRdcr(state={}, action) {

    switch(action.type) {

        case LOGIN_USER:
            return{...state, authenticated: true}

        case GET_USER:
            return{...state, user: action.payload}
            
        case AUTH_ERROR:
            return{...state, error: "there was a problem"}
            
        default:
            return state    

    }
}