
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Missing from './pages/Missing.jsx'
import { AuthProvider } from './hooks/AuthContext.jsx'
import Community from './pages/Community.jsx'
import Account from './pages/Account.jsx'
import './assets/index.css'
import About from './pages/About.jsx'
import Members from './pages/Members.jsx'
import Society from './pages/Society.jsx'
import ComingSoon from './pages/ComingSoon.jsx'


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="registration" element={<Registration />} />
              <Route path="login" element={<Login />} />
              <Route path="community" element={<Community />} />
              <Route path="account" element={<Account />} />
              <Route path="society/:societyName" element={<Society />} />
              <Route path="society/:societyName/members" element={<Members />} />
              <Route path="about" element={<About />} />
              <Route path="coming_soon" element={<ComingSoon />} />
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
