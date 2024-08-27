import { useState, useEffect } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import zxcvbn from "zxcvbn"; //password strength suggestions
import Alert from "../components/Alert";

const Registration = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        title: "",
        content: ""
    });

    //name, email, reg_no, ieee_no, phone, password
    const [registrationForm, setRegistrationForm] = useState({
        name: "",
        email: "",
        reg_no: "",
        year: "",
        ieee_no: "",
        phone: "",
        password: ""
    });

    //password
    const [confirmed, setConfirmed] = useState(false);
    //variable storing confirm password
    const [confirmPass, setConfirmPass] = useState("");
    //handle change
    const handleConfirm = (e) => {
        e.preventDefault;
        setConfirmPass(e.target.value);
    }
    //password stregth suggestion
    const [passwordStrength, setPasswordStrength] = useState("");

    //track password fields
    useEffect(() => {
        if (registrationForm.password == confirmPass) {
            setConfirmed(true)
        } else {
            setConfirmed(false)
        }
        setPasswordStrength(zxcvbn(registrationForm.password).feedback.warning);
    }, [registrationForm.password, confirmPass])

    //when user makes changes to the form
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setRegistrationForm(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    //form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //send data to the server
        setLoading(true);
        axios.post("/api/members/signup", { registrationForm }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                const status = response.status;
                if (status == 201) {
                    setShowAlert(true);
                    setAlert({
                        title: "Success!",
                        content: "Check your inbox for a verification email"
                    })
                    setLoading(false);
                }
            })
            .catch((error) => {
                setShowAlert(true);
                setAlert({
                    title: "Error!",
                    content: `Error registering user! Details: ${error.response.data.message}`

                })
                setLoading(false);
                console.log(error)
            })
            //clear form
            .finally(() => {
                setRegistrationForm({
                    name: "",
                    email: "",
                    reg_no: "",
                    year: "",
                    ieee_no: "",
                    phone: "",
                    password: ""
                });
                setConfirmPass("");
                setLoading(false);
            })
    }

    return (
        <>

            <div className="container">
                {showAlert &&
                    <div className="alert-card-overlay">
                        <div className="alert-card-content">
                            <button onClick={() => setShowAlert(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg></button>
                            <Alert title={alert.title} content={alert.content} />
                        </div>
                    </div>
                }
                <div className="inner-div-2">
                    <div className="card w-80 register-card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <legend>Join the Community</legend>

                                <div className="form-group">
                                    <label htmlFor="name">Name <span style={{ color: "red" }}>*</span></label>
                                    <input className="form-control" name="name" value={registrationForm.name} onChange={handleChange} required placeholder="e.g Jane Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Student Reg. Number <span style={{ color: "red" }}>*</span></label>
                                    <input className="form-control" name="reg_no" value={registrationForm.reg_no} onChange={handleChange} placeholder="e.g F17/0000/2020" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="year">Year of Study <span style={{ color: "red" }}>*</span></label>
                                    <select className="form-control" name="year" id="year" onChange={handleChange} value={registrationForm.year} required>
                                        <option value="" disabled>SELECT</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>Postgraduate</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">IEEE Member Number <span><a href="https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                                    </svg></a></span></label>
                                    <input className="form-control" name="ieee_no" id="ieee_no" type="number" value={registrationForm.ieee_no} onChange={handleChange} placeholder="Leave blank if none" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email <span style={{ color: "red" }}>*</span></label>
                                    <input className="form-control" name="email" type="email" value={registrationForm.email} onChange={handleChange} pattern=".+@students\.uonbi\.ac\.ke" placeholder="example@students.uonbi.ac.ke" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Telephone <span style={{ color: "red" }}>*</span></label>
                                    <input className="form-control" name="phone" type="tel" value={registrationForm.phone} onChange={handleChange} minLength={10} placeholder="e.g 0712345678" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Password <span style={{ color: "red" }}>*</span></label>
                                    <input className="form-control" name="password" type="password" value={registrationForm.password} onChange={handleChange} required />

                                    <PasswordStrengthBar password={registrationForm.password} />

                                    <p style={{ color: "orange" }}>{passwordStrength && "Tip: " + passwordStrength}</p>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Confirm Password <span style={{ color: "red" }}>*</span></label>
                                    <input className="form-control" name="password" type="password" value={confirmPass} onChange={handleConfirm} required />
                                    {!confirmed && registrationForm.password.length && confirmPass.length != 0 > 0 && <p style={{ color: "red" }}>Passwords do not match</p>}
                                </div>
                                <br />
                                <div>
                                    <small className="form-text text-muted"><span style={{ color: "red" }}>*</span> Indicates required field </small>
                                </div>
                                <br />
                                <div>
                                    <button type="submit" className="btn btn-primary" disabled={!confirmed || loading}>{!loading ? "Submit" : "working ..."}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Registration;
