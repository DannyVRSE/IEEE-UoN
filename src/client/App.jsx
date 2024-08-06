
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Missing from './pages/Missing'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}/>
            <Route path="registration" element={<Registration/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="*" element={<Missing/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
