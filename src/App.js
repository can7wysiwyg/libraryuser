import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationComp from "./components/pages/nav/NavigationComp";
import Login from "./components/pages/widgets/auth/Login";
import Home from "./components/pages/widgets/Home";
import ShowBook from "./components/pages/widgets/books/ShowBook";
import BorrowBooks from "./components/pages/widgets/books/BorrowBooks";
import UserPanel from "./components/pages/widgets/user/UserPanel";
import MyReadings from "./components/pages/widgets/user/MyReadings";
import BooksByGenre from "./components/pages/widgets/books/BooksByGenre";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavigationComp />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/single_book/:id" element={<ShowBook />} />
        <Route path="/borrow_books" element={<BorrowBooks />} />
        <Route path="/user_panel" element={<UserPanel />} />
        <Route path="/my_readings" element={<MyReadings />} />
        <Route path="/books_by_genre/:id" element={<BooksByGenre />} />

      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
