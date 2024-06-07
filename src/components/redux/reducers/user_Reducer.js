import { BOOK_ERROR, MY_BOOKS } from "../actions/types";

export function userRdcr(state={}, action) {

    switch(action.type) {

        case MY_BOOKS:
            return{...state, result: action.payload}

        case BOOK_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    

    }

}