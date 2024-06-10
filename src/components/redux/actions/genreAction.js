import axios from "axios"
import {  GET_GENRE, SHOW_GENRES, GENRE_ERROR, LIMITED_GENRES } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"


export function getGenres() {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/genre/show_all`)

            const genres = response.data.genres

            dispatch({type: SHOW_GENRES, payload: genres})
            
        } catch (error) {
            console.error(error)
            dispatch({type: GENRE_ERROR})
            throw error
        }


    }

}


export function getGenresLimited() {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/showgenre/show_limited`)

            const genresLimited = response.data.genresLimited

            dispatch({type: LIMITED_GENRES, payload: genresLimited})
            
        } catch (error) {
            console.error(error)
            dispatch({type: GENRE_ERROR})
            throw error
        }


    }

}


export function SingleGenre(id) {
    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/showgenre/show_single/${id}`)

            const genre = response.data.genre

            dispatch({type: GET_GENRE, payload: genre})
            
        } catch (error) {
            console.error(error)
            dispatch({type: GENRE_ERROR})
            throw error
        }

    }
}


