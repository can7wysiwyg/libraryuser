import axios from "axios"
import { BOOK_ERROR, MY_BOOKS } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { usertoken } from "../../helpers/UserToken"

export function MyBooks(client) {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/card/show_owner_books/${client}`, {

                headers: {
                    Authorization: `Bearer ${usertoken}`
                }

            })

            const result = response.data.result

            dispatch({type: MY_BOOKS, payload: result})
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
        }

    }

}