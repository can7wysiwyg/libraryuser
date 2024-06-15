import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksLimited } from "../../redux/actions/bookAction";
import { getGenresLimited } from "../../redux/actions/genreAction";

function Home() {
  const booksLimited = useSelector((state) => state.booksRdcr.booksLimited);
  const genresLimited = useSelector((state) => state.genreRdcr.genresLimited);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getBooksLimited());

        await dispatch(getGenresLimited());
      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchItems();
  }, [dispatch]);

  if (
    !booksLimited ||
    booksLimited === undefined ||
    booksLimited === null ||
    !genresLimited ||
    genresLimited === undefined ||
    genresLimited === null
  ) {
    return (
      <>
        <div className="loader" style={{ marginTop: "3rem" }}>
        
        </div>
      </>
    );
  }

  if (booksLimited.lenghth === 0 || genresLimited.lenghth === 0) {
    return (
      <>
        <h6 className="text-center" style={{ marginTop: "3rem" }}>
          there are no books at the moment
        </h6>
      </>
    );
  }

  return (<>

{genresLimited?.map((genre) => {
        const genreBooks = booksLimited.filter((book) => book.bookGenre === genre._id);

        const firstTwoBooks = genreBooks.filter((filteredBook, index) => {
          return genre._id === filteredBook.bookGenre && index < 3;
        });

        return (
          <div key={genre._id} style={{ marginTop: "2rem", fontFamily: "Times New Roman" }}>
            <h6>
              {" "}
              <a
                href={`/books_by_genre/${genre._id}`}
                style={{ textDecoration: "none" }}
              >
                {genre.genreName} Books
              </a>{" "}
            </h6>
            <div className="row">
              {firstTwoBooks.map((filteredBook) => (
                <div key={filteredBook._id} className="col-md-4 mb-4">
                  <div className="card cont h-100 shadow-sm">
                    <img
                      src={filteredBook.bookImage}
                      alt={filteredBook.bookTitle}
                      className="card-img-top"
                      style={{
                        width: "100%",
                        maxHeight: "30vh",
                        objectFit: "contain",
                      }}
                    />
                    <div className="card-body">
                      <p>
                        {" "}
                        <a
                          href={`/single_book/${filteredBook._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {filteredBook.bookTitle}
                        </a>
                      </p>
                      <p>
                        {filteredBook.bookAuthor}
                      </p>
                     
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

  
  
  </>);
}

export default Home;
