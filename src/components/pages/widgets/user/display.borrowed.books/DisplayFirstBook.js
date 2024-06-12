import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import moment from 'moment';
import { deleteBookOne } from '../../../../redux/actions/userAction';
import { useDispatch } from 'react-redux';



// the WORKERSRC url  should be changed per api version... 


const DisplayFirstBook = ({ myBooks, books }) => {
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
    
    // {(slots) => transformToolbarSlot(slots)}

    useEffect(() => {
        if (myBooks.bookOne) {
            const item = books.find((book) => book._id === myBooks.bookOne);
            setItems(item);
        }
    }, [books, myBooks.bookOne]);

    const handleButtonClick = () => {
        setPdfVisible(!pdfVisible);
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
                                {pdfVisible ? 'Hide PDF' : 'View PDF'}
                            </button>
                            {pdfVisible && (
                                <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                                    <div style={{ height: '750px' }}>
                                        <Viewer 
                                            fileUrl={named}
                                            plugins={[defaultLayoutPluginInstance]}
                                        />
                                    </div>
                                </Worker>
                            )}
                        </div> <h6 className="card-text text-primary"
                         style={{ cursor: 'pointer' }} onClick={DeleteBookOne}> 
                         Not satisified? return book
                        
                       </h6>


                    </div>
                </div>
            </div>
        </>
    );
};

export default DisplayFirstBook;
