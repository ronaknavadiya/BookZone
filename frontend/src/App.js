import "./App.css";
import { useAppContext } from "./context/appContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import "./App.css";
import FavouriteGenre from "./pages/FavouriteGenre";
import BookPage from "./pages/BookPage";

function App() {
  const data = useAppContext();
  console.log("data:", data);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signUp" element={<SignupPage />}></Route>
          <Route path="/book" element={<BookPage />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/favGenre" element={<FavouriteGenre />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
