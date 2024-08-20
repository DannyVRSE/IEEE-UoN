import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
import Manage from "../components/Manage";

const token = localStorage.getItem("ieeeuon_token");


const Members = () => {
    const { societyName } = useParams();
    let name = societyName.toUpperCase();
    const [members, setMembers] = useState([]);
    const [manageMembersPopup, setManageMembersPopup] = useState(false);

    const fetchMembers = () => {
        axios.get(`/api/admin/${societyName}/members`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setMembers(response.data)
                console.log(members, "members")
            })
            .catch((error) => {
                alert(error)
            })
    }

    //copy to clipboard
    const handleCopy = (email) => {
        navigator.clipboard.writeText(email).then(() => {
            alert("Email Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    //fetch on render
    useEffect(() => {
        fetchMembers()
    }, [])

    return (
        <>
            {manageMembersPopup && <>
                <div className="alert-card-overlay">
                    <div className="alert-card-content">
                    <button onClick={() => setManageMembersPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg></button>
                        <Manage />
                    </div>
                </div>
            </>}

            <div className="container">
                <div className="inner-div-2">
                    <BackBtn />
                    <h1>{societyName == "ieee_uon" ? "IEEE UoN" : name} Members</h1>
                    <div>
                        <button onClick={()=>setManageMembersPopup(true)} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg> Manage</button>
                    </div>
                    <br />
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Privilege</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.email}>
                                        <td>{member.name}</td>
                                        <td><button className="btn" onClick={() => handleCopy(member.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                        </svg></button>{member.email}</td>
                                        <td>{member.year}</td>
                                        <td>{member.phone}</td>
                                        <td>{member.role}</td>
                                        <td>{member.privilege_level}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Members
