import BlogDetailDashboard from './components/BlogDetailDashboard'
import Footer from './components/Footer'
import Header from './components/Header'
import CreateBlog from './pages/CreateBlog'
import LandingPage from './pages/LandingPage'
import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import EditBlog from './pages/EditBlog'


const App = () => {
  return (
    <div className='h-screen mx-auto'>
      <Router>
        <Header/>
        <Routes>
          <Route path={"/"} index element={<LandingPage/>}/>
          <Route path={"/blog/:id"} element={<BlogDetailDashboard/>}/>
          <Route path={"/edit_blog/:id"} element={<EditBlog/>}/>
          <Route path={"/createBlog"} element={<CreateBlog/>}/>
        </Routes>
        <Footer/>
      </Router>
      <Toaster/>
    </div>
  )
}

export default App;