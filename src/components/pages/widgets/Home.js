import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/actions/bookAction";
import { getGenres } from "../../redux/actions/genreAction";

function Home() {
  const books = useSelector((state) => state.booksRdcr.books);
  const genres = useSelector((state) => state.genreRdcr.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getBooks());

        await dispatch(getGenres());
      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchItems();
  }, [dispatch]);

  if (
    !books ||
    books === undefined ||
    books === null ||
    !genres ||
    genres === undefined ||
    genres === null
  ) {
    return (
      <>
        <h6 className="text-center" style={{ marginTop: "3rem" }}>
          data is loading
        </h6>
      </>
    );
  }

  if (books.lenghth === 0 || genres.lenghth === 0) {
    return (
      <>
        <h6 className="text-center" style={{ marginTop: "3rem" }}>
          there are no books at the moment
        </h6>
      </>
    );
  }

  return (<>

{genres?.map((genre) => {
        const genreBooks = books.filter((book) => book.bookGenre === genre._id);

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
