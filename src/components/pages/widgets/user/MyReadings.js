import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { useEffect, useState } from "react";

import {Viewer, Worker } from "@react-pdf-viewer/core"
import '@react-pdf-viewer/core/lib/styles/index.css';

import { getUser } from "../../../redux/actions/authAction";
import { MyBooks } from "../../../redux/actions/userAction";
import { getBooks } from "../../../redux/actions/bookAction";


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

    {/* { result.bookTwo === "" ? "" : <DisplaySecondBook myBooks={result} books={books} />}

    {result.bookThree === "" ? "" : <DisplayThirdBook myBooks={result} books={books} />} */}



</div>

    
    
    </>)
}

const DisplayFirstBook = ({ myBooks, books }) => {
  const [items, setItems] = useState({});
  const [numPages, setNumPages] = useState(0);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(currentPage);

  // Retrieve current page from local storage
  useEffect(() => {
      const storedPage = localStorage.getItem('currentPDFPage');
      if (storedPage) {
          setCurrentPage(parseInt(storedPage, 10));
      }
  }, []);

  // Fetch book details
  useEffect(() => {
      if (myBooks.bookOne) {
          const item = books.find((book) => book._id === myBooks.bookOne);
          setItems(item);
      }
  }, [books, myBooks.bookOne]);

  const handleButtonClick = () => {
      setPdfVisible(true);
  };

  const updateCurrentPage = (newPage) => {
      setCurrentPage(newPage);
      localStorage.setItem('currentPDFPage', newPage);
  };

  const handleSearchPage = (page) => {
      if (page >= 1 && page <= numPages) {
          updateCurrentPage(page);
      }
  };

  const named = items.bookFile;

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
                              View PDF
                          </button>
                          {pdfVisible && (
                              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js">
                                  <div style={{ height: '750px' }}>
                                      <Viewer 
                                          fileUrl={named} 
                                          initialPage={currentPage - 1}
                                          onLoadSuccess={({ numPages }) => {
                                              setNumPages(numPages);
                                              setSearchPage(currentPage);
                                          }}
                                          onPageChange={({ currentPageIndex }) => {
                                              updateCurrentPage(currentPageIndex + 1);
                                          }}
                                      />
                                      <div>
                                          <input
                                              type="number"
                                              value={searchPage}
                                              onChange={(e) => setSearchPage(parseInt(e.target.value))}
                                          />
                                          <button onClick={() => handleSearchPage(searchPage)}>Go To Page</button>
                                      </div>
                                      <div>
                                          <p>Page {currentPage} of {numPages || 0}</p>
                                          <button
                                              disabled={currentPage <= 1}
                                              onClick={() => updateCurrentPage(currentPage - 1)}
                                          >
                                              Previous Page
                                          </button>
                                          <button
                                              disabled={currentPage >= numPages}
                                              onClick={() => updateCurrentPage(currentPage + 1)}
                                          >
                                              Next Page
                                          </button>
                                      </div>
                                  </div>
                              </Worker>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};


  
  
  
  // function DisplaySecondBook ({ myBooks, books }) {
  //       const [items, setItems] = useState({});
  //   const [numPages, setNumPages] = useState(null);
  //   const [pdfVisible, setPdfVisible] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [searchPage, setSearchPage] = useState(currentPage);
  
  //   // Add memory function to retrieve and set the current page from local storage
  //   useEffect(() => {
  //     const storedPage = localStorage.getItem('currentPDFPage');
  //     if (storedPage) {
  //       setCurrentPage(parseInt(storedPage, 10));
  //     }
  //   }, []);
  
  //   const handleButtonClick = () => {
  //     setPdfVisible(true);
  //   };
  
  //   useEffect(() => {
  //     if (myBooks.bookTwo) {
  //       const item = books.find((book) => book._id === myBooks.bookTwo);
  //       setItems(item);
  //     }
  //   }, [books, myBooks.bookTwo]);
  
  //   const named = items.bookFile;
  
    
    
  //   const updateCurrentPage = (newPage) => {
  //     setCurrentPage(newPage);
  //     localStorage.setItem('currentPDFPage', newPage);
  //   };
  
    
  //   const handleSearchPage = (page) => {
  //     if (page >= 1 && page <= numPages) {
  //       setCurrentPage(page);
  //       localStorage.setItem('currentPDFPage', page);
  //     }
  //   };
  
  //   return (
  //     <>
  //       <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
  //         <div className="col-md-8">
  //           <div className="card mb-4">
  //             <img src={items.bookImage} alt={items.bookTitle} style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} />
  //             <div className="card-body text-center">
  //               <h5 className="card-title">{items.bookTitle}</h5>
  //               <p className="card-text">released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
  //               <div>
  //                 <button onClick={handleButtonClick}>Show PDF</button>
  //                 {pdfVisible && (
  //                   <div>
  //                     <Document
  //                       file={named}
  //                       onLoadSuccess={({ numPages }) => {
  //                         setNumPages(numPages);
  //                         setSearchPage(currentPage);
  //                       }}
  //                     >
  //                       <Page pageNumber={currentPage} />
  //                     </Document>
  //                     <div>
  //                       <input
  //                         type="number"
  //                         value={searchPage}
  //                         onChange={(e) => setSearchPage(parseInt(e.target.value))}
  //                       />
  //                       <button onClick={() => handleSearchPage(searchPage)}>Go To Page</button>
  //                     </div>
  //                     <div>
  //                       <p>Page {currentPage} of {numPages}</p>
  //                       <button
  //                         disabled={currentPage <= 1}
  //                         onClick={() => updateCurrentPage(currentPage - 1)}
  //                       >
  //                         Previous Page
  //                       </button>
  //                       <button
  //                         disabled={currentPage >= numPages}
  //                         onClick={() => updateCurrentPage(currentPage + 1)}
  //                       >
  //                         Next Page
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //               {/* <h5 className="card-text text-primary" style={{ cursor: 'pointer' }} onClick={deleteBook}>
  //                 not satisfied? return book
  //               </h5> */}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  
  
  // function DisplayThirdBook ({ myBooks, books }) {
  //       const [items, setItems] = useState({});
  //   const [numPages, setNumPages] = useState(null);
  //   const [pdfVisible, setPdfVisible] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [searchPage, setSearchPage] = useState(currentPage);
    
  
  //   // Add memory function to retrieve and set the current page from local storage
  //   useEffect(() => {
  //     const storedPage = localStorage.getItem('currentPDFPage');
  //     if (storedPage) {
  //       setCurrentPage(parseInt(storedPage, 10));
  //     }
  //   }, []);
  
  //   const handleButtonClick = () => {
  //     setPdfVisible(true);
  //   };
  
  //   useEffect(() => {
  //     if (myBooks.bookThree) {
  //       const item = books.find((book) => book._id === myBooks.bookThree);
  //       setItems(item);
  //     }
  //   }, [books, myBooks.bookThree]);
  
  //   const named = items.bookFile;
  
      
  //   // Add a function to update the current page and store it in local storage
  //   const updateCurrentPage = (newPage) => {
  //     setCurrentPage(newPage);
  //     localStorage.setItem('currentPDFPage', newPage);
  //   };
  
  //   // Add a function to handle page search
  //   const handleSearchPage = (page) => {
  //     if (page >= 1 && page <= numPages) {
  //       setCurrentPage(page);
  //       localStorage.setItem('currentPDFPage', page);
  //     }
  //   };
  
  //   return (
  //     <>
  //       <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
  //         <div className="col-md-8">
  //           <div className="card mb-4">
  //             <img src={items.bookImage} alt={items.bookTitle} style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }} />
  //             <div className="card-body text-center">
  //               <h5 className="card-title">{items.bookTitle}</h5>
  //               <p className="card-text">released on {moment(items.bookReleaseDate).format('MMM D YYYY')}</p>
  //               <div>
  //                 <button onClick={handleButtonClick}>Show PDF</button>
  //                 {pdfVisible && (
  //                   <div>
  //                     <Document
  //                       file={named}
  //                       onLoadSuccess={({ numPages }) => {
  //                         setNumPages(numPages);
  //                         setSearchPage(currentPage);
  //                       }}
  //                     >
  //                       <Page pageNumber={currentPage} />
  //                     </Document>
  //                     <div>
  //                       <input
  //                         type="number"
  //                         value={searchPage}
  //                         onChange={(e) => setSearchPage(parseInt(e.target.value))}
  //                       />
  //                       <button onClick={() => handleSearchPage(searchPage)}>Go To Page</button>
  //                     </div>
  //                     <div>
  //                       <p>Page {currentPage} of {numPages}</p>
  //                       <button
  //                         disabled={currentPage <= 1}
  //                         onClick={() => updateCurrentPage(currentPage - 1)}
  //                       >
  //                         Previous Page
  //                       </button>
  //                       <button
  //                         disabled={currentPage >= numPages}
  //                         onClick={() => updateCurrentPage(currentPage + 1)}
  //                       >
  //                         Next Page
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //               {/* <h5 className="card-text text-primary" style={{ cursor: 'pointer' }} onClick={deleteBook}>
  //                 not satisfied? return book
  //               </h5> */}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  
  



export default MyReadings