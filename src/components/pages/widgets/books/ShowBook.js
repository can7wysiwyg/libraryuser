import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { bookByGenre, getBook } from "../../../redux/actions/bookAction"
import moment from "moment/moment"
import BorrowFilter from "../../../helpers/BorrowFilter"



function ShowBook() {
   const {id} = useParams()
   const book = useSelector((state) => state.booksRdcr.book)
   const dispatch = useDispatch()
   


   useEffect(() => {

    const fetchBook = async() => {

        try {

            await dispatch(getBook(id))
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchBook()


   }, [dispatch, id])



   


   if(!book || book === undefined || book === null) {

    return (
        <>
          <h6 className="text-center" style={{ marginTop: "3rem" }}>
            data is loading
          </h6>
        </>
      );
    
   }

   


    return(<>

<div className="container" style={{fontFamily: "Times New Roman"}}>


<div className="row justify-content-center" style={{marginTop: "2rem"}}>
          <div className="col-md-8">
            <div className="card mb-4">
              <img src={book.bookImage} alt={book.bookTitle} style={{width: "100%", maxHeight: "30vh", objectFit: "contain"}} />
              <div className="card-body text-center">
                <h5 className="card-title">{book.bookTitle}</h5>
                <p className="card-text">released on {moment(book.bookReleaseDate).format("MMM D YYYY")} </p>
                <p className="card-text text-primary">  {book.bookAuthor}</p>

                <BorrowFilter filteredBook={book} />
                
              </div>
            </div>
          </div>
        </div> 

<div>
<h1 style={{fontFamily: "Times New Roman"}}>Related Books</h1>

<RelatedBooks category={book.bookGenre} />

</div>

    </div>
    
    

    
    
    </>)
}

const RelatedBooks = ({category}) => {

    const genreBooks = useSelector((state) =>state.booksRdcr.genreBooks)
    const dispatch = useDispatch()


   

    
    useEffect(() => {
 
     const fetchByGenre = async() => {

        await dispatch(bookByGenre(category))
 
         
     }
 
     fetchByGenre()
 
 
    }, [dispatch, category])


    if(!genreBooks) {
      return(<>
      <h6 className="text-center" style={{marginTop: "3rem"}}>not available at the moment</h6>
      
      </>)
    }


    let relatedTitles = genreBooks?.slice(-3)


 

    return(<>
    <div className="row" style={{marginTop: "2rem"}}>
                        {relatedTitles.map((filteredBook) => (
                           <div key={filteredBook._id} className="col-md-4 mb-4">
                              <div className="card cont h-100 shadow-sm">
                                 <img src={filteredBook.bookImage} 
                                 alt={filteredBook.bookTitle} 
                                 className="card-img-top"style={{width: "100%", maxHeight: "30vh",objectFit: "contain"}}
                                 />
                                  <div className="card-body">
                                 <p><a href={`/single_book/${filteredBook._id}`} style={{textDecoration: "none"}}>{filteredBook.bookTitle}</a></p>
                                  <p>
                                    {filteredBook.bookAuthor} 
                                    
                                    </p> 

                                    <BorrowFilter filteredBook={filteredBook} />
                

                               
                                 </div>
                                                        </div>
                           </div>
                        ))}
                     </div>
    

    

    
    </>)
}



export default ShowBook