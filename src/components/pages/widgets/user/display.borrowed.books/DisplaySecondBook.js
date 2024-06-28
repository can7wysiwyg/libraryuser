import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookTwo } from "../../../../redux/actions/userAction";
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';


// the WORKERSRC url  should be changed per api version... 


const DisplaySecondBook = ({ myBooks, books }) => {
    const [items, setItems] = useState({});
    const [pdfVisible, setPdfVisible] = useState(false);
    const dispatch = useDispatch()

    
    
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

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
    const fullScreenPluginInstance = fullScreenPlugin();
    const { EnterFullScreen, exitFullScreen } = fullScreenPluginInstance;
  


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

                            {pdfVisible && named && (
                <div style={{ height: '750px' }}>
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Toolbar>
                      {(props) => {
                        const {
                          CurrentPageInput,
                          GoToNextPage,
                          GoToPreviousPage,
                          NumberOfPages,
                          EnterFullScreen,
                        } = props;
                        return (
                          <div style={{ alignItems: 'center', display: 'flex' }}>
                            <GoToPreviousPage />
                            <CurrentPageInput /> / <NumberOfPages />
                            <GoToNextPage />
                            <EnterFullScreen />
                          </div>
                        );
                      }}
                    </Toolbar>
                    <Viewer
                      fileUrl={named}
                      plugins={[toolbarPluginInstance, fullScreenPluginInstance]}
                      defaultScale={SpecialZoomLevel.PageWidth}
                    />
                  </Worker>
                </div>
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

export default DisplaySecondBook