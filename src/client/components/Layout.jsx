import { Outlet, Link } from 'react-router-dom';
import logo from "../assets/images/ieee_logo.png"
const Layout = () => {
  return (
    <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={logo} alt="ieee_logo" width="80"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                                <li className="nav-item"><Link to="/community" className="nav-link">Community</Link></li>
                                <li className="nav-item"><Link to="/account" className="nav-link">Profile</Link></li>
                                <li className="nav-item"><Link to="/about" className="nav-link">About IEEE</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet /></>
  )
}
export default Layout
