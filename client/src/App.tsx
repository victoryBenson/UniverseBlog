
import LandingPage from './pages/LandingPage'
import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LandingPage/>}/>
      </Routes>
    </Router>
  )
}

export default App