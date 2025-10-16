import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Naviga from './components/Naviga';
import Home from './pages/Home';
import Services from './pages/Services';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import BookingForm from './pages/Booking';
import Footer from './components/Foot';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Naviga loggedIn={loggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Services' element={<Services />} />
          <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/booking' element={<BookingForm />} />
          <Route path='/toadmin' element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
