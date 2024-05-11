import ReactDOM from 'react-dom/client'
import "./global.css"
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { PrivateRoutes } from './utils/PrivateRoutes'
import Dashboard from './pages/Dashboard'
import Albums from './pages/Albums'
import { AuthProvider } from './context/AuthContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="" element={<PrivateRoutes></PrivateRoutes>} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/albums" element={<Albums />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
)