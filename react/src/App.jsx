import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Naviga from "./components/Naviga";
import Home from "./pages/Home";
import Services from "./pages/Services";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import BookingForm from "./pages/Booking";
import Footer from "./components/Foot";
import AdminDashboard from "./pages/AdminDashboard";
import Zero from "./pages/About";
import UserStatusPage from "./pages/UserStatus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    setLoggedIn(!!token);
    setIsAdmin(role === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
        <BrowserRouter>
          <Naviga loggedIn={loggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/toadmin" element={<AdminDashboard />} />
            <Route path="/zero" element={<Zero />} />
            <Route path="/userstatus" element={<UserStatusPage />} />
          </Routes>
          <Footer />
          <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        </BrowserRouter>
    </div>
  );
}

export default App;