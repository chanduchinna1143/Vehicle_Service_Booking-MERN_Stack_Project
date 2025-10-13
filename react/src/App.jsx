
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Naviga from './components/Naviga'
import Home from './pages/Home'
import { BrowserRouter ,Route , Routes} from 'react-router'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Naviga />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      {/* <Route path='/About' element={<About/>}></Route>
      <Route path='/Services' element={<Contact />}></Route>
      <Route path='/Login' element={<Login />}></Route> */}
      </Routes> 
      
      
      
      
      </BrowserRouter>
    </div>
  )
}

export default App
