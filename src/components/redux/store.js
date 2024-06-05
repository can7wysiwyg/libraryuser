import { configureStore } from "@reduxjs/toolkit";
import { authRdcr } from "./reducers/auth_Reducer";



export const store =  configureStore({
        reducer: {
            authRdcr

        },

        middleware:  (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false
            })
    
        }
    
    })

