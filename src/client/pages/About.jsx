import ieeeInfo from "../markdown/ieee"
import Markdown from 'react-markdown'
const About = () => {
  return (
    <> 
    
        <div className="container">
            <div className="inner-div-2">
                <Markdown>{ieeeInfo}</Markdown>
            </div>
        </div>
    </>
  )
}

export default About
