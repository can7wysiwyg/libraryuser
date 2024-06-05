import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationComp from "./components/pages/nav/NavigationComp";
import Login from "./components/pages/widgets/auth/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavigationComp />

      <Routes>

        <Route path="/login" element={<Login />} />
        

      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
