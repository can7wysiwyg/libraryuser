import axios from "axios"
import { BOOK_ERROR, CHECK_CARD, DELETE_BOOK, MY_BOOKS } from "./types"
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



export function deleteBookOne(id) {

    return async function(dispatch) {

        try {

        

        const resp = await axios.put(`${ApiUrl}/card/update_book_one/${id}`, {}, {

            headers: {
                Authorization: `Bearer ${usertoken}`
            }

            

        })

        
           


            const response =  await axios.delete(`${ApiUrl}/card/delete_book/${id}`,  {

                headers: {
                    Authorization: `Bearer ${usertoken}`
                }

            })

            dispatch({type: DELETE_BOOK})

            alert(resp.data.msg)

            alert(response.data.msg)

            window.location.reload()




            
        } catch (error) {

            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
            
        }


    }
}



export function deleteBookTwo(id) {

    return async function(dispatch) {

        try {

        

        const resp = await axios.put(`${ApiUrl}/card/delete_book_two/${id}`, {}, {

            headers: {
                Authorization: `Bearer ${usertoken}`
            }

            

        })

        
           


            const response =  await axios.delete(`${ApiUrl}/card/delete_book/${id}`,  {

                headers: {
                    Authorization: `Bearer ${usertoken}`
                }

            })

            dispatch({type: DELETE_BOOK})

            alert(resp.data.msg)

            alert(response.data.msg)

            window.location.reload()




            
        } catch (error) {

            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
            
        }


    }
}

export function deleteBookThree(id) {

    return async function(dispatch) {

        try {

        

        const resp = await axios.put(`${ApiUrl}/card/delete_book_three/${id}`, {}, {

            headers: {
                Authorization: `Bearer ${usertoken}`
            }

            

        })

        
           


            const response =  await axios.delete(`${ApiUrl}/card/delete_book/${id}`,  {

                headers: {
                    Authorization: `Bearer ${usertoken}`
                }

            })

            dispatch({type: DELETE_BOOK})

            alert(resp.data.msg)

            alert(response.data.msg)

            window.location.reload()




            
        } catch (error) {

            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
            
        }


    }
}



export function checkCard(id) {
    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/card/show_to_user/${id}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`
                }
            })

            const card = response.data.card

            dispatch({type: CHECK_CARD, payload: card})
            
        } catch (error) {
            console.error(error)
            dispatch({type: BOOK_ERROR})
            throw error
            
        }


    }
}