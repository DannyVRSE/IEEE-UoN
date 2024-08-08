import PWABadge from "../components/PWABadge"
import Footer from "../components/Footer"
import { useAuth } from "../components/AuthContext"
import { useEffect, useState } from "react"

const Home = () => {
  const {user, getUser, loading}=useAuth();
  const [text, setText]=useState("Log in");
  const [btnClass, setBtnClass]=useState("btn btn-info");
  const [style, setStyle]=useState({ marginRight: "20px" })

  //get use on login

  useEffect(()=>{
    getUser();
    if(user){
      //change text to logged in
      setText("Logged in")
      //modify button to disabled
      setBtnClass("btn btn-success disabled")
      //remove pointer
      setStyle({marginRight: "20px", pointerEvents:"none"})
    }
  },[loading])

  return (
    <div className="container">
      <div className="inner-div-1">
      {user&&<div><p>{loading&&<div className="loader"></div>}{user.name}</p></div>}
        <h1>Welcome To IEEE UON</h1>
        <br />
        <a href="/login" role="button" className={btnClass} style={style}>{text}</a><a href="/registration" role="button" className="btn btn-warning">Join</a>
        <PWABadge />
        <Footer />
      </div>
    </div>
  )
}

export default Home
