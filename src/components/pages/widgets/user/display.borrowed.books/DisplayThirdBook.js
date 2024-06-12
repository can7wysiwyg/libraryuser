import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // Import the plugin
import { deleteBookThree } from "../../../../redux/actions/userAction";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// the WORKERSRC url  should be changed per api version... 


const DisplayThirdBook = ({ myBooks, books }) => {
    const [items, setItems] = useState({});
    const [pdfVisible, setPdfVisible] = useState(false);
    const dispatch = useDispatch()


    const transformToolbarSlot = (slot) => [
        slot.ZoomIn,
        slot.ZoomInMenuItem,
        slot.ZoomOut,
        slot.ZoomOutMenuItem,
        // Add other toolbar slots as needed
    ];

    // Create an instance of the plugin with the transformed toolbar
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar: (Toolbar) => (
            <Toolbar>
                {(slots) => transformToolbarSlot(slots)}
            </Toolbar>
        ),
    });
    

    
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
                                <Worker workerUrl= "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
>
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

  
  
 
export default DisplayThirdBook