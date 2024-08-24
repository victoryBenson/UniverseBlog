import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BlogProvider from './context/Blog.tsx'
import AuthProvider from './context/Auth.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BlogProvider>
      <StrictMode>
          <App />
      </StrictMode>,
    </BlogProvider>
  </AuthProvider>
)
