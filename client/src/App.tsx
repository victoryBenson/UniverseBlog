
import Footer from './components/Footer'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'


const App = () => {
  return (
    <div className='h-screen mx-auto'>
      <Router>
        <Header/>
        <Routes>
          <Route path={"/"} element={<LandingPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App