import { useAuth } from "../hooks/AuthContext"
import Markdown from 'react-markdown';
import { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
    const { user, loading, getUser, token } = useAuth();
    const [aboutUserPopup, setAboutUserPopup] = useState(false);
    const [editProfilePopup, setEditProfilePopup] = useState(false);
    const [working, setWorking] = useState(false);

    const [modifyProfileForm, setModifyProfileForm] = useState({
        name: "",
        email: "",
        year: "",
        ieee_no: "",
        phone: "",
    })

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setModifyProfileForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWorking(true);
        axios.patch(`/api/v1/members/`, { modifyProfileForm }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            alert(res.data.message);
        }).catch(err => {
            alert(err.response.data.message);
        }).finally(() => {
            setWorking(false);
            setEditProfilePopup(false);
            setModifyProfileForm({
                name: user.name,
                year: user.year,
                ieee_no: user.ieee_no,
                phone: user.phone,
            })
        })

    }

    useEffect(() => {
        getUser();
        if (user) {
            setModifyProfileForm({
                name: user.name,
                email: user.email,
                year: user.year,
                ieee_no: user.ieee_no,
                phone: user.phone,
            })
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="inner-div-2">
                    {loading && <div className="loader"></div>}
                    {!user && <h1><a href="login">Log In</a></h1>}
                    {user &&
                        <>
                            <p>{user.name}</p>
                            <div>
                                <div>
                                    <button className="btn btn-primary" onClick={getUser}>Refresh</button>
                                    <button className="btn btn-primary ms-3" onClick={() => setAboutUserPopup(true)}>About Me</button>
                                    <button className="btn btn-primary ms-3" onClick={() => setEditProfilePopup(true)}>Edit Profile</button>
                                </div>
                                <br />
                                {aboutUserPopup && <>
                                    <div className="alert-card-overlay">
                                        <div className="alert-card-content">

                                            <div className="card border-info">
                                                <div className="card-header text-bg-info d-flex justify-content-between align-items-center">About Me <button onClick={() => setAboutUserPopup(false)} className="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                </svg></button></div>
                                                <div className="card-body">
                                                    <p>Name: {user.name}</p>
                                                    <p>Email: {user.email}</p>
                                                    <p>Year of Study: {user.year}</p>
                                                    <p>IEEE Number <span> <a href="https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                                                    </svg></a></span> : {user.ieee_no}</p>
                                                    <p>Phone: {user.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>}

                                {editProfilePopup && <>
                                    <div className="alert-card-overlay">
                                        <div className="alert-card-content">
                                            <div className="card border-danger">
                                                <div className="card-header text-bg-danger d-flex justify-content-between align-items-center">Edit Profile <button onClick={() => setEditProfilePopup(false)} className="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                </svg></button></div>
                                                <div className="card-body">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="name" className="form-label">Name <span style={{ color: "red" }}>*</span></label>
                                                            <input type="text" className="form-control" id="name" name="name" value={modifyProfileForm.name} placeholder={user.name} onChange={handleChange} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="form-label">Email</label>
                                                            <input type="email" className="form-control" id="email" name="email" value={modifyProfileForm.email} placeholder={user.email} onChange={handleChange} disabled />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="year" className="form-label">Year of Study <span style={{ color: "red" }}>*</span></label>

                                                            <select className="form-control" name="year" id="year" onChange={handleChange} value={modifyProfileForm.year} required>
                                                                <option value="" disabled> SELECT</option>
                                                                <option>I</option>
                                                                <option>II</option>
                                                                <option>III</option>
                                                                <option>IV</option>
                                                                <option>V</option>
                                                                <option>Postgraduate</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="ieee_no" className="form-label">IEEE Number<span> <a href="https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                                                            </svg></a></span></label>
                                                            <input type="text" className="form-control" id="ieee_no" name="ieee_no" value={modifyProfileForm.ieee_no} placeholder={user.ieee_no ? user.ieee_no : "None existing. Enter if you have one"} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="phone" className="form-label">Phone <span style={{ color: "red" }}>*</span></label>
                                                            <input type="tel" className="form-control" id="phone" name="phone" value={modifyProfileForm.phone} minLength={10} placeholder={user.phone} onChange={handleChange} required />
                                                        </div>
                                                        <div>
                                                            <small className="form-text text-muted"><span style={{ color: "red" }}>*</span> Indicates required field </small>
                                                        </div>
                                                        <br />
                                                        <button type="submit" className="btn btn-primary" disabled={working}> {working ? "Working" : "Save"}</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                }
                                <div>
                                    <h2 >My Societies</h2>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Society
                                                    </th>
                                                    <th scope="col">
                                                        Role
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    user.societies.map((society) => (
                                                        <tr key={society.society_name}>
                                                            <td>{society.society_name}</td>
                                                            <td>{society.role}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </>
                    }
                    <br />
                    <div>
                        <h2>Join the global community!</h2>
                        <Markdown>[Explore IEEE membership and communities](https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join).</Markdown>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Account
