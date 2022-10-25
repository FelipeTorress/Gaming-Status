import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LolStatus from './pages/LolStatus';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/lolstatus' element={<LolStatus/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
