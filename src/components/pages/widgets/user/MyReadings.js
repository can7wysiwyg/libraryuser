import {  useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { getUser } from "../../../redux/actions/authAction";
import { MyBooks } from "../../../redux/actions/userAction";
import { getBooks } from "../../../redux/actions/bookAction";
import DisplayFirstBook from "./display.borrowed.books/DisplayFirstBook"
import DisplaySecondBook from "./display.borrowed.books/DisplaySecondBook"
import DisplayThirdBook from "./display.borrowed.books/DisplayThirdBook"






function MyReadings() {

    const user = useSelector((state) => state.authRdcr.user)
    const books = useSelector((state) => state.booksRdcr.books)
    const result = useSelector((state) => state.userRdcr.result)

    const dispatch = useDispatch()


    useEffect(() => {

        const fetchUser = async() => {

            try {

                await dispatch(getUser())
                await dispatch(getBooks())
                
            } catch (error) {
                console.error("there was a problem")
            }


        }

        fetchUser()


    }, [dispatch])




useEffect(() => {


    const fetchItems = async() => {

        if(user) {

            await dispatch(MyBooks(user._id))
        }


    }


    fetchItems()


}, [dispatch, user])


if(result === undefined || result === null || result === "" || !books) {
    return(<div style={{marginTop: "2rem"}}>
    
    <h3 className="text-center">as your books load</h3>
     <h4 className="text-center">you can borrow books, if you have not borrowed already..</h4>
     <h5 className="text-center">go to home to start your search for a book <a href="/">home</a></h5>
    
    </div>)


}





    return(<>

<div className="container text-center" style={{margin: "2rem"}}>

{ result.bookOne === "" ? "" :   <DisplayFirstBook myBooks={result} books={books} /> }

     { result.bookTwo === "" ? "" : <DisplaySecondBook myBooks={result} books={books} />}

     {result.bookThree === "" ? "" : <DisplayThirdBook myBooks={result} books={books} />} 



</div>

    
    
    </>)
}






  


export default MyReadings