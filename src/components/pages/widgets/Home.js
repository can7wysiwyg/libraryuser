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

  if (!books || !genres) {
    return (
      <>
        <div className="loader" style={{ marginTop: "3rem" }}></div>
      </>
    );
  }

  if (books.length === 0 || genres.length === 0) {
    return (
      <>
        <h6 className="text-center" style={{ marginTop: "3rem" }}>
          There are no books at the moment
        </h6>
      </>
    );
  }

  const fictionGenres = genres.find(genre => genre.genreName.toLowerCase() === 'fiction');
  const nonFictionGenres = genres.find(genre => genre.genreName.toLowerCase() === 'non-fiction');

  const renderGenreBooks = (genre, books) => {
    const firstThreeBooks = books.filter((book, index) => index < 3);



    
    return (
      <div key={genre._id} style={{ marginTop: "2rem", fontFamily: "Times New Roman" }}>
        <h6>
          <a href={`/books_by_genre/${genre._id}`} style={{ textDecoration: "none" }}>
            {genre.genreName} Books
          </a>
        </h6>
        <div className="row">
          {firstThreeBooks.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card cont h-100 shadow-sm">
                <img
                  src={book.bookImage}
                  alt={book.bookTitle}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    maxHeight: "30vh",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body">
                  <p>
                    <a href={`/single_book/${book._id}`} style={{ textDecoration: "none" }}>
                      {book.bookTitle}
                    </a>
                  </p>
                  <p>{book.bookAuthor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {fictionGenres && fictionGenres.subgenres.length > 0 && (
        <div>
          <h3>Fiction</h3>
          {fictionGenres.subgenres.map(subgenre => {
            const subgenreBooks = books.filter(book => book.bookSubGenre === subgenre);
            return renderGenreBooks({ _id: fictionGenres._id, genreName: subgenre }, subgenreBooks);
          })}
        </div>
      )}

      {nonFictionGenres && nonFictionGenres.subgenres.length > 0 && (
        <div>
          <h3>Non-Fiction</h3>
          {nonFictionGenres.subgenres.map(subgenre => {
            const subgenreBooks = books.filter(book => book.bookSubGenre === subgenre);
            return renderGenreBooks({ _id: nonFictionGenres._id, genreName: subgenre }, subgenreBooks);
          })}
        </div>
      )}
    </>
  );
}

export default Home;
