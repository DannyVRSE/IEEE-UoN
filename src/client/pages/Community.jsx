import Carousel from 'react-bootstrap/Carousel';
import roboticsImage from '../assets/images/robot.png';
//import engineerImage from '../assets/images/engineer.png';
import circuitImage from '../assets/images/circuit.png';
import telecommsImage from '../assets/images/telecomms.png';
import engineer from '../assets/images/engineer.png'
import { useNavigate } from "react-router-dom"

const Community = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">              
                <div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src={engineer}
                                alt="WIE"
                            />
                            <Carousel.Caption>
                                <h3>Women In Engineering</h3>
                                <button className="btn btn-info" onClick={() => { navigate('/society/wie') }}>Explore <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg></button>
                            </Carousel.Caption>
                        </Carousel.Item>


                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src={roboticsImage}
                                alt="RAS"
                            />
                            <Carousel.Caption>
                                <h3>Robotics and Automation Society</h3>
                                <button className="btn btn-info" onClick={() => { navigate('/society/ras') }}>Explore <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg></button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src={circuitImage}
                                alt="CASS"
                            />
                            <Carousel.Caption>
                                <h3>Circuits and Systems Society</h3>
                                <button className="btn btn-info" onClick={() => { navigate('/society/cass') }}>Explore <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg></button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src={telecommsImage}
                                alt="MTTS"
                            />
                            <Carousel.Caption>
                                <h3>Microwave Theory and Techniques Society</h3>
                                <button className="btn btn-info" onClick={() => { navigate('/society/mtts') }}>Explore <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg></button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </>


    );
}

export default Community;
