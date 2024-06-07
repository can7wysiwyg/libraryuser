import { configureStore } from "@reduxjs/toolkit";
import { authRdcr } from "./reducers/auth_Reducer";
import { booksRdcr } from "./reducers/books_Reducer";
import { genreRdcr } from "./reducers/genre_Reducer";
import { userRdcr } from "./reducers/user_Reducer";






export const store =  configureStore({
        reducer: {
            authRdcr,
            booksRdcr,
            genreRdcr,
            userRdcr

        },

        middleware:  (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false
            })
    
        }
    
    })

