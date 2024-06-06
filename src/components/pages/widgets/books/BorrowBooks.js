import { useState, useEffect } from "react";
import { emptyCart, getCart, removeItem } from "../../../helpers/BooksTrolley"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/actions/authAction";
import { booksBorrow } from "../../../redux/actions/bookAction";




function BorrowBooks() {
    const [items, setItems] = useState([]);


    useEffect(() => {
        const cartItems = getCart().map((item) => ({ ...item, quantity: 1 }));
        setItems(cartItems);
      }, []);



      let extracted = {};
items.forEach((item, index) => {
  extracted[`book${index + 1}`] = item._id;
});

if(Object.keys(extracted).length === 0) {
  return(<>
  
  <h1 className="text-center" style={{marginTop: "3rem"}}>as your books  load...</h1>
  </>)
}


  
  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
    setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const handleEmptyCart = () => {
    emptyCart(() => {
      setItems([]);
    });
    window.location.reload(); // Refresh the page after emptying the cart
  };

  if (items.length === 0) {
    return (
      <>
        <h2 className="text-center" style={{marginTop: "3rem"}}>no books in trolley</h2>
        <p className="text-center" style={{marginTop: "3rem"}}>
          {" "}
          back to <a href="/">home</a>
        </p>
      </>
    );
  }


    


    return(<>

<div
        className="row justify-content-center"
        style={{ marginTop: "2rem", marginBottom: "2rem", fontFamily: "Times New Roman" }}
      >
        {items?.map((item) => (
          <div
            key={item._id}
            className="col-md-8"
            style={{ marginBottom: "2rem" }}
          >
            <div className="card cont h-100 shadow-sm">
              <img
                src={item.bookImage}
                alt={item.bookTitle}
                className="card-img-top"
                style={{
                  width: "100%",
                  maxHeight: "30vh",
                  objectFit: "contain",
                }}
              />
              <div className="card-body">
                <p>
                  <a
                    href={`/single_book/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {item.bookTitle}
                  </a>
                </p>
                <h4>

                {item.bookAuthor}

                
                </h4>

                
                         <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  REMOVE BOOK
                </button>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", margin: "2rem" }}>
          <button
            className="btn btn-danger"
            onClick={handleEmptyCart}
            style={{ marginRight: "3rem" }}
          >
            Empty Trolley
          </button>

          <SubmitButton extracted={extracted} />
        </div>
      </div>

    
    
    </>)
}


const SubmitButton = ({extracted}) => {

     
    const user = useSelector((state) => state.authRdcr.user)
    const dispatch = useDispatch()
    
    const values = {
      bookOne: extracted.book1 || '',
      bookTwo: extracted.book2 || '',
      bookThree: extracted.book3 || '',
      borrower: ''
    };


    useEffect(() => {

        const fetchUser = async() => {

            try {

                await dispatch(getUser())
                
            } catch (error) {
                console.error("there was a problem")
            }


        }
 
        fetchUser()

    }, [dispatch])
    
  
    if(!user || user === undefined || user === null) {

        return(<>
        
        <h6 className="text-center" style={{marginTop: "3rem"}}>user is loading</h6>
        
        </>)
    }

  
    const handleSubmit = async(event) => {
      event.preventDefault()


      await dispatch(booksBorrow(user._id, values))
  
      
     
  
    }
  
  
  
    return(<>
  
  <button className="btn btn-primary" onClick={handleSubmit}>BORROW BOOK(S)</button> 
  
  
  </>)}
  
  

export default BorrowBooks