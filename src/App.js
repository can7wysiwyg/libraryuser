import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationComp from "./components/pages/nav/NavigationComp";
import Login from "./components/pages/widgets/auth/Login";
import Home from "./components/pages/widgets/Home";
import ShowBook from "./components/pages/widgets/books/ShowBook";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavigationComp />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/single_book/:id" element={<ShowBook />} />
        

      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
