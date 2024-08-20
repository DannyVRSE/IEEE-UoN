import Footer from "../components/Footer"
import ieeeInfo from "../markdown/ieee"
import Markdown from 'react-markdown'
const About = () => {
  return (
    <> 
        <div className="container">
            <div className="inner-div-2">
                <h1>About IEEE</h1>
                <br />
                <Markdown>{ieeeInfo}</Markdown>
            </div>
        </div>
    </>
  )
}

export default About
