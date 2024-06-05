import axios from "axios"
import { BOOK_ERROR, BOOK_GENRE, GET_BOOK, GET_BOOKS } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"

export function getBooks() {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/books/show_all`)

            const books = response.data.books


            dispatch({type: GET_BOOKS, payload: books})
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
        }
    }
}


export function getBook(id) {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/books/single_book/${id}`)

            const book = response.data.book


            dispatch({type: GET_BOOK, payload: book})
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
        }
    }
}


export function bookByGenre(category) {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/books/show_according_to_genre/gnr?genre=${category}`)

            const genreBooks = response.data.books


            dispatch({type: BOOK_GENRE , payload: genreBooks})
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
        }
    }
}