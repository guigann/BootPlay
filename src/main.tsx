import ReactDOM from 'react-dom/client'
import "./global.css"
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <BrowserRouter>
        <Routes>

          <Route path="/" index element={<Home />} />

        </Routes>
      </BrowserRouter>
  </>
)