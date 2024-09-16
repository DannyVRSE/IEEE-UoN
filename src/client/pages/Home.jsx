import PWABadge from "../components/PWABadge"
import Footer from "../components/Footer"
import { useAuth } from "../hooks/AuthContext"
import { useEffect } from "react"
import backgroundVideo from "../assets/videos/tech_background.mp4"
import { useNavigate } from "react-router-dom"
import Socials from "../components/Socials"

const Home = () => {

  const navigate = useNavigate();//navigate to other pages

  const { user, getUser, loading } = useAuth();//get user and loading state from AuthContext

  //get use on login

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      {/*background video */}
      <video autoPlay loop muted id="tech-background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="container">

        <div className="inner-div-1">

          <div>
            {user && <div>{loading && <div className="loader"></div>}<p>{user.fname}</p></div>}
          </div>

          <div>
            <h1>Welcome To IEEE UoN Student Branch</h1>
          </div>

          <br />

          <div>
            <button onClick={() => { navigate("/login") }} style={user ? { pointerEvents: "none" } : {}} className={user ? "btn btn-success disabled ms-3" : "btn btn-primary home-btn"}>{user ? "Logged In" : "Log In"}</button>

            <button onClick={() => { navigate("/registration") }} role="button" disabled={user} className="btn btn-info ms-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
            </svg> {user ? "Joined" : "Join"}</button>

            <button onClick={() => { navigate("society/ieee_uon") }} className="btn btn-info ms-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
            </svg> About</button>
          </div>

          <br />

          <div>
            <h5><a href="/community" >Explore Societies <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
              <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
            </svg></a></h5>
          </div>

          <br />
          
          <div className="mt-5">
            <h5>Follow us on social media</h5>
            <Socials user={user} />
          </div>

          <PWABadge />

        </div>
        <Footer />
      </div>

    </>

  )
}

export default Home
