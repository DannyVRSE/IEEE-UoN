
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Missing from './pages/Missing'
import { AuthProvider } from './hooks/AuthContext'
import Community from './pages/Community'
import Account from './pages/Account'

import './assets/index.css'
import About from './pages/About'
import Members from './pages/Members'
import Society from './pages/Society'
import ComingSoon from './pages/ComingSoon'

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
              <Route path="coming_soon" element={<ComingSoon/>}/>
              <Route path="*" element={<Missing />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
