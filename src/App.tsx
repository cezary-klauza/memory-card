import './styles/main.scss'
import Logo from './components/Logo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'

function App() {

  return (
    <Router>
      <div className='app'>
        <Logo />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App
