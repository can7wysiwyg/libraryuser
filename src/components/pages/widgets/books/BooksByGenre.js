import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bookByGenre } from "../../../redux/actions/bookAction";
import { Container, Button, Row, Col } from "react-bootstrap";

function BooksByGenre() {
    const { id } = useParams();
    const genreBooks = useSelector((state) => state.booksRdcr.genreBooks);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9;
    const [transition, setTransition] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                await dispatch(bookByGenre(id));
            } catch (error) {
                console.error("There was a problem");
            }
        };

        fetchItems();
    }, [dispatch, id]);

    const handlePageChange = (pageNumber) => {
        setTransition(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setTransition(false);
        }, 300); // Duration of the transition
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = genreBooks?.slice(indexOfFirstBook, indexOfLastBook);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(genreBooks.length / booksPerPage); i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? "btn-primary" : "btn-secondary"}
                    style={{ margin: "0 5px" }}
                >
                    {i}
                </Button>
            );
        }
        return pageNumbers;
    };

    if (!genreBooks) {
        return (
            <h5 className="text-center" style={{ marginTop: "3rem" }}>
                Data is loading
            </h5>
        );
    }

    if (genreBooks.length === 0) {
        return (
            <h5 className="text-center" style={{ marginTop: "3rem" }}>
                There are no books of this genre at the moment
            </h5>
        );
    }

    return (
        <Container>
            <Row
                className={`row ${transition ? "slide" : ""}`}
                style={{ marginTop: "2rem", transition: "transform 0.3s ease-in-out" }}
            >
                {currentBooks.map((filteredBook) => (
                    <Col key={filteredBook._id} md={4} className="mb-4">
                        <div className="card cont h-100 shadow-sm">
                            <img
                                src={filteredBook.bookImage}
                                alt={filteredBook.bookTitle}
                                className="card-img-top"
                                style={{ width: "100%", maxHeight: "30vh", objectFit: "contain" }}
                            />
                            <div className="card-body">
                                <p>
                                    <a href={`/single_book/${filteredBook._id}`} style={{ textDecoration: "none" }}>
                                        {filteredBook.bookTitle}
                                    </a>
                                </p>
                                <h6>{filteredBook.bookAuthor}</h6>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center" style={{ marginTop: "2rem" }}>
                {renderPageNumbers()}
            </div>
        </Container>
    );
}

export default BooksByGenre;
