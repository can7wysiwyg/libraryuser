import { BOOK_ERROR, DELETE_BOOK, MY_BOOKS } from "../actions/types";

export function userRdcr(state={}, action) {

    switch(action.type) {

        case MY_BOOKS:
            return{...state, result: action.payload}

        case DELETE_BOOK:
            return{...state, msg: "success"}    

        case BOOK_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    

    }

}