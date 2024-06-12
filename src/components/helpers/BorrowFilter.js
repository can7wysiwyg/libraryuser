import { usertoken } from "./UserToken"
import {addItem, getCart } from "./BooksTrolley"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUser } from "../redux/actions/authAction"
import { checkCard } from "../redux/actions/userAction";


function BorrowFilter({filteredBook}) {
     const card = useSelector((state) => state.userRdcr.card)
     const user = useSelector((state) => state.userRdcr.user)
    const [redirect, setRedirect] = useState(false);
    const[result, setResult] = useState({})
    const [items, setItems] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUser = async() => {

            await dispatch(getUser())


        }

        fetchUser()




    }, [dispatch] )


    useEffect(() => {

        
            if(user) {
                dispatch(checkCard(user._id))
            }
    


        

        

    }, [dispatch, user])


    useEffect(() => {
        const cartItems = getCart().map(item => ({ ...item, quantity: 1 }));
        setItems(cartItems);
      }, []);
     
     
     
     
      useEffect(() => {
     
       const doFiltering = () => {
         
     
           if(filteredBook._id) {
     
             items?.filter((item) => {
            
               if(item._id === filteredBook._id)  setResult(item)
               
           
     
            } )
           
     
           }
     
         
     
       }
     
       doFiltering()
     
      }, [items, filteredBook._id ])
     
   


   const shouldRedirect = (redirect) => {
    if (redirect) {
      return (window.location.href = "/borrow_books");
    }
  };



    const alezz = () => {
        alert("You need an account to borrow a book. Create One.");
      };
    

    const BorrowLogic = () => {

        if(!usertoken || usertoken === undefined || usertoken === null) {

            return(<>
            <h5 className="text-danger" style={{cursor: "pointer"}} onClick={alezz}> BORROW BOOK</h5>
            
            </>)
        }   if( card !== undefined || card !== null) {

            return(<>
                <h5 className="text-center">
          
               RETURN BOOKS TO BORROW
          
                </h5>
                
                </>)



        }


        if(usertoken && items.length >= 3) {
                
          return(<>
          <h5 className="text-center" style={{cursor: "pointer"}}>
    
         BORROW LIMIT IS THREE
    
          </h5>
          
          </>)
        }

        
        
        
        
        
        if(usertoken) {

            return(<>
                
                
                { result._id === filteredBook._id ? <h5 className="text-center" style={{cursor: "pointer"}}>Book Is In Trolley </h5>
                 : <h5 className="text-center text-primary"
                                     onClick={ () => {
                                        addItem(filteredBook, () => {
                                           setRedirect(true)
                                          
                                        })
                                     }
                                        
                                     }
                                 style={{cursor: "pointer"}}

                                     >
                                       Borrow Book
                                     </h5> }   
                   
                   
                   </>
                   )
             


        }
    }

    return(<>
    {shouldRedirect(redirect)}


    {BorrowLogic() }
    
    
    </>)
}

export default BorrowFilter