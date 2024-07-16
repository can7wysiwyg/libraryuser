import axios from "axios"
import { BOOK_ERROR, BOOK_GENRE, BORROW_BOOKS, GET_BOOK, GET_BOOKS, GET_SUBGENRE, LIMITED_BOOKS } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { usertoken } from "../../helpers/UserToken"

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


export function getBooksLimited() {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/books/show_all_limited`)

            const booksLimited = response.data.booksLimited


            dispatch({type: LIMITED_BOOKS, payload: booksLimited})
            
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


export function bookBySubgenre(subgenre) {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/books/show_according_to_subgenre/subgnr?subgenre=${subgenre}`)

            const subGenreBooks = response.data.books


            dispatch({type: GET_SUBGENRE , payload: subGenreBooks})
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
        }
    }
}




export function booksBorrow(client, data) {


    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/borrow/borrow_books/${client}`, data, {
                headers: {
                    Authorization: `Bearer ${usertoken}`
                }

            })

            dispatch({type: BORROW_BOOKS})
            alert(response.data.msg)

            localStorage.removeItem('book')
  
              window.location.href = "/my_readings"
          
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
        }

    }


}