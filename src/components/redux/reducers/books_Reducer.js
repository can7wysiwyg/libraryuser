import { BOOK_ERROR, BOOK_GENRE, GET_BOOK, GET_BOOKS } from "../actions/types";

export function booksRdcr(state={}, action) {

    switch(action.type) {

        case GET_BOOKS:
            return{...state, books: action.payload}

        case GET_BOOK:
            return{...state, book: action.payload}

        case BOOK_GENRE:
            return{...state, genreBooks: action.payload}    
            
        case BOOK_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state     

    }
}