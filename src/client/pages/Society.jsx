import axios from 'axios';
import Markdown from 'react-markdown';
import BackBtn from '../components/BackBtn';
import { useNavigate, useParams } from "react-router-dom";
import cassInfo from '../markdown/cass';
import ieee_uonInfo from '../markdown/ieee_uon';
import mttsInfo from '../markdown/mtts';
import rasInfo from '../markdown/ras';
import wieInfo from '../markdown/wie';
import { useAuth } from '../hooks/AuthContext';
import { useState, useEffect } from 'react';

const Society = () => {

    const navigate = useNavigate();
    const { societyName } = useParams();//get society name from route params
    const [admin, setAdmin] = useState(false);//is user an overall privileged member
    const [isMember, setIsMember] = useState(false);//is user a member of this society
    const [joining, setJoining] = useState(false);//is user joining society, basically a loader

    //society ABOUT markups
    const info = `${societyName}Info`;
    const society = {
        cassInfo: cassInfo, ieee_uonInfo: ieee_uonInfo, mttsInfo: mttsInfo, rasInfo: rasInfo, wieInfo: wieInfo
    }

    const events={
        cass:"https://events.vtools.ieee.org/events/search?_sub=true&q=&ou=SBC10110B+-+University+of+Nairobi%2CCAS04&d=All&commit=Search",
        ieee_uon:"https://events.vtools.ieee.org/events/search?_sub=true&q=&ou=STB10110+-+University+of+Nairobi&d=All&commit=Search",
        mtts:"https://events.vtools.ieee.org/events/search?_sub=true&q=&ou=SBC10110A+-+University+of+Nairobi%2CMTT17&d=All&commit=Search",
        ras:"https://events.vtools.ieee.org/events/search?_sub=true&q=&ou=SBC10110+-+University+of+Nairobi%2CRA24&d=All&commit=Search",
        wie:"https://events.vtools.ieee.org/events/search?_sub=true&q=&ou=SBA10110+-+University+of+Nairobi%2CWIE&d=All&commit=Search"
    }

    //get user, email, token 
    const { user, loading, getUser, token } = useAuth();

    //user details
    const getUserDetails = () => {
        if (user) {
            //general privilege, can manage any society
            if (user.privilege_level == "advanced") {
                setAdmin(true)
            }
            //get user memberships the user has
            user.societies.forEach(soc => {
                //check if user is a member of this society
                if (soc.society_name.toLowerCase() === societyName) {
                    setIsMember(true)
                    //handle society admin
                    if (soc.privilege_level === "advanced") {
                        setAdmin(true)
                    }
                }
            });
        }
    }

    //join (email, society)
    const handleJoin = async () => {

        if (societyName === "ieee_uon") {
            navigate("/registration")
        } else {
            if (!user) {
                alert("Please log in to join")
            }
            else {
                setJoining(true)
                axios.post(`/api/v1/members/memberships`, { email: user.email, society: societyName.toUpperCase() }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        if (response.status === 201) {
                            alert(`You have joined the ${societyName.toUpperCase()} society!`)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        alert("Error joining society")
                    })
                    .finally(() => {
                        setJoining(false)
                        //refresh user details
                        getUser();
                    })
            }
        }
    }

    //do all this on page render
    useEffect(() => {
        getUser();
        getUserDetails();
    }, [])

    return (
        <>
            <div className="container">
                <div className="inner-div-2">
                    <BackBtn />
                    <br />
                    <div>

                        {loading && <div className="loader"></div>}

                        <div>

                            <button disabled={isMember || joining} onClick={handleJoin} className="btn btn-info home-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                            </svg>{isMember ? "Joined" : joining ? "Joining" : "Join"}</button>

                            <a href={events[societyName]} className="btn btn-info ms-3" role="button" rel="external" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-month-fill" viewBox="0 0 16 16">
                                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm.104 7.305L4.9 10.18H3.284l.8-2.375zm9.074 2.297c0-.832-.414-1.36-1.062-1.36-.692 0-1.098.492-1.098 1.36v.253c0 .852.406 1.364 1.098 1.364.671 0 1.062-.516 1.062-1.364z" />
                                <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M2.56 12.332h-.71L3.748 7h.696l1.898 5.332h-.719l-.539-1.602H3.1zm7.29-4.105v4.105h-.668v-.539h-.027c-.145.324-.532.605-1.188.605-.847 0-1.453-.484-1.453-1.425V8.227h.676v2.554c0 .766.441 1.012.98 1.012.59 0 1.004-.371 1.004-1.023V8.227zm1.273 4.41c.075.332.422.636.985.636.648 0 1.07-.378 1.07-1.023v-.605h-.02c-.163.355-.613.648-1.171.648-.957 0-1.64-.672-1.64-1.902v-.34c0-1.207.675-1.887 1.64-1.887.558 0 1.004.293 1.195.64h.02v-.577h.648v4.03c0 1.052-.816 1.579-1.746 1.579-1.043 0-1.574-.516-1.668-1.2z" />
                            </svg> Events</a>

                        </div>
                        {/*Only visible to privileged users */}
                        <br />
                        <div>
                            {admin &&
                                <button disabled={!admin} onClick={() => navigate(`members`)} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-gear" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                </svg>Members</button>
                            }

                        </div>

                    </div>
                    <br />
                    <div>
                        <Markdown>{society[info]}</Markdown>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Society
