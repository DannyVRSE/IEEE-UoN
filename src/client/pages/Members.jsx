import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
const token = localStorage.getItem("ieeeuon_token");

const Members = () => {
    const { societyName } = useParams();
    let name = societyName.toUpperCase();
    const [members, setMembers] = useState([]);

    //fetch members
    const fetchMembers = () => {
        axios.get(`/api/admin/${societyName}/members`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                handleMembers(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }

    const handleMembers = (members) => {
        let memberArray = [];
        members.forEach(member => {
            const user = {
                id: member.member_id,
                name: member.name,
                email: member.email,
                year: member.year,
                phone: member.phone,
                role: member.role,
                privilege: member.privilege_level
            };

            memberArray.push(user);
            setMembers(memberArray);
        });
    }
    //fetch on render
    useEffect(() => {
        fetchMembers()
    }, [])


    return (
        <>
            <div className="container">
                <div className="inner-div-2">
                    <BackBtn />
                    <h1>{societyName == "ieee_uon" ? "IEEE UoN" : name} Members</h1>
                    <div>
                        <button className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
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
                                    <tr key={member.id}>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.year}</td>
                                        <td>{member.phone}</td>
                                        <td>{member.role}</td>
                                        <td>{member.privilege}</td>
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
