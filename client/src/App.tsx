import BlogDetailDashboard from './components/BlogDetailDashboard'
import Footer from './components/Footer'
import Header from './components/Header'
import CreateBlog from './pages/CreateBlog'
import LandingPage from './pages/LandingPage'
import { Routes,Route, BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import EditBlog from './pages/EditBlog'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import NotFound from './components/NotFound'
import RestorePasswordDashboard from './pages/RestorePasswordDashboard'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import NewPassword from './pages/NewPassword'


const App = () => {
  return (
    <div className='h-screen mx-auto'>
      <Router>
        <Header/>
        <Routes>
            <Route path={"/"} index element={<LandingPage/>}/>
            <Route path={"/blog/:id"} element={<BlogDetailDashboard/>}/>
            <Route path={"/editBlog/:id"} element={<EditBlog/>}/>
            <Route path={"/createBlog"} element={<CreateBlog/>}/>
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'*'} element={<NotFound/>}/>
            <Route path='/resetPassword' element={<RestorePasswordDashboard/>}/>
            <Route path={'/forgotPassword'} element={<ForgotPassword/>}/>
            <Route path={'/verifyOTP'} element={<VerifyOTP/>}/>
            <Route path={'/newPassword'} element={<NewPassword/>}/>
        </Routes>
        <Footer/>
      </Router>
      <Toaster/>
    </div>
  )
}

export default App;