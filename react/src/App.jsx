
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Naviga from './components/Naviga'
import Home from './pages/Home'
import { BrowserRouter ,Route , Routes} from 'react-router-dom'
import Services from './pages/Services'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import BookingForm from './pages/Booking'
import Footer from './components/Foot'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Naviga />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Services' element={<Services />}></Route>
      {/* <Route path='/About' element={<About/>}></Route> */}
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path="/SignUp" element = {<SignUp/>}/>
      <Route path='/booking' element = {<BookingForm/>}/>
      </Routes>
      <Footer/> 
      
      
      
      
      </BrowserRouter>
    </div>
  )
}

export default App
