import PWABadge from "../components/PWABadge"
import Footer from "../components/Footer"
const Home = () => {
  return (
    <div className="container">
      <div className="inner-div-1">
        <h1>Welcome To The Society</h1>
        <br/>
        <a href="/login" role="button" className="btn btn-info" style={{ marginRight: "20px" }}>Log In</a><a href="/registration" role="button" className="btn btn-warning">Join</a>
        <PWABadge />
        <Footer />
      </div>
    </div>
  )
}

export default Home
