import { GENRE_ERROR, SHOW_GENRES, GET_GENRE, LIMITED_GENRES } from "../actions/types";

export function genreRdcr(state={}, action) {

    switch(action.type) {

        
        case  SHOW_GENRES:
            return{...state, genres: action.payload} 

        case LIMITED_GENRES:
            return{...state, genresLimited: action.payload}    
            
        case GET_GENRE:
            return{...state, genre: action.payload}

        case GENRE_ERROR:
            return{...state, error: "there was a problem"}
            
        default:
            return state    

    }

}