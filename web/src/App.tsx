import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LolStatus from './pages/LolStatus';
import Player from './pages/Player';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/lolstatus' element={<LolStatus/>} />
        <Route path='/player/:playerName' element={<Player/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
