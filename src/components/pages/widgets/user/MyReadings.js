import {  useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import { useEffect, useState} from "react";
import { getUser } from "../../../redux/actions/authAction";
import { MyBooks, deleteBookOne, deleteBookThree, deleteBookTwo } from "../../../redux/actions/userAction";
import { getBooks } from "../../../redux/actions/bookAction";



import {Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // Import the plugin



import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// the WORKERSRC url  should be changed per api version... 

let WORKERSRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

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


const DisplayFirstBook = ({ myBooks, books }) => {
    const [items, setItems] = useState({});
    const [pdfVisible, setPdfVisible] = useState(false);
    const dispatch = useDispatch()

    // Create an instance of the plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        if (myBooks.bookOne) {
            const item = books.find((book) => book._id === myBooks.bookOne);
            setItems(item);
        }
    }, [books, myBooks.bookOne]);


    
    const handleButtonClick = () => {
        setPdfVisible(!pdfVisible); // Toggle the visibility
    };

    const named = items.bookFile;


    const DeleteBookOne = async(e) => {
        e.preventDefault()

        let id = myBooks._id

        await dispatch(deleteBookOne(id))

    }

    return (
        <>
            <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img 
                            src={items.bookImage} 
                            alt={items.bookTitle} 
                            style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} 
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{items.bookTitle}</h5>
                            <p className="card-text">Released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
                            <button onClick={handleButtonClick} className="btn btn-primary">
                                {pdfVisible ? "Hide PDF" : "View PDF"}  {/* Button text changes based on pdfVisible */}
                            </button>
                            {pdfVisible && (
                                <Worker workerUrl={WORKERSRC}>
                                    <div style={{ height: '750px' }}>
                                        <Viewer 
                                            fileUrl={named}
                                            plugins={[defaultLayoutPluginInstance]}
                                        />
                                    </div>
                                </Worker>
                            )}
                        </div>
                        <h6 className="card-text text-primary"
                         style={{ cursor: 'pointer' }} onClick={DeleteBookOne}> 
                         Not satisified? return book
                        
                       </h6>
                    </div>
                </div>
            </div>
        </>
    );
};



const DisplaySecondBook = ({ myBooks, books }) => {
    const [items, setItems] = useState({});
    const [pdfVisible, setPdfVisible] = useState(false);
    const dispatch = useDispatch()

    // Create an instance of the plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        if (myBooks.bookTwo) {
            const item = books.find((book) => book._id === myBooks.bookTwo);
            setItems(item);
        }
    }, [books, myBooks.bookTwo]);

    const handleButtonClick = () => {
        setPdfVisible(!pdfVisible); // Toggle the visibility
    };

    const named = items.bookFile;


    const DeleteBookTwo = async(e) => {
        e.preventDefault()

        let id = myBooks._id

        await dispatch(deleteBookTwo(id))

    }


    return (
        <>
            <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img 
                            src={items.bookImage} 
                            alt={items.bookTitle} 
                            style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} 
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{items.bookTitle}</h5>
                            <p className="card-text">Released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
                            <button onClick={handleButtonClick} className="btn btn-primary">
                                {pdfVisible ? "Hide PDF" : "View PDF"}  {/* Button text changes based on pdfVisible */}
                            </button>
                            {pdfVisible && (
                                <Worker workerUrl={WORKERSRC}>
                                    <div style={{ height: '750px' }}>
                                        <Viewer 
                                            fileUrl={named}
                                            plugins={[defaultLayoutPluginInstance]}
                                        />
                                    </div>
                                </Worker>
                            )}
                        </div>

                        <h6 className="card-text text-primary"
                         style={{ cursor: 'pointer' }} onClick={DeleteBookTwo}> 
                         Not satisified? return book
                        
                       </h6>
                    </div>
                </div>
            </div>
        </>
    );
};



  
const DisplayThirdBook = ({ myBooks, books }) => {
    const [items, setItems] = useState({});
    const [pdfVisible, setPdfVisible] = useState(false);
    const dispatch = useDispatch()

    // Create an instance of the plugin
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        if (myBooks.bookThree) {
            const item = books.find((book) => book._id === myBooks.bookThree);
            setItems(item);
        }
    }, [books, myBooks.bookThree]);

    const handleButtonClick = () => {
        setPdfVisible(!pdfVisible); // Toggle the visibility
    };

    const named = items.bookFile;


    const DeleteBookThree = async(e) => {
        e.preventDefault()

        let id = myBooks._id

        await dispatch(deleteBookThree(id))

    }


    return (
        <>
            <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img 
                            src={items.bookImage} 
                            alt={items.bookTitle} 
                            style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} 
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{items.bookTitle}</h5>
                            <p className="card-text">Released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
                            <button onClick={handleButtonClick} className="btn btn-primary">
                                {pdfVisible ? "Hide PDF" : "View PDF"}  {/* Button text changes based on pdfVisible */}
                            </button>
                            {pdfVisible && (
                                <Worker workerUrl={WORKERSRC}>
                                    <div style={{ height: '750px' }}>
                                        <Viewer 
                                            fileUrl={named}
                                            plugins={[defaultLayoutPluginInstance]}
                                        />
                                    </div>
                                </Worker>
                            )}
                        </div>
                        <h6 className="card-text text-primary"
                         style={{ cursor: 'pointer' }} onClick={DeleteBookThree}> 
                         Not satisified? return book
                        
                       </h6>
                    </div>
                </div>
            </div>
        </>
    );
};

  
  
 


export default MyReadings