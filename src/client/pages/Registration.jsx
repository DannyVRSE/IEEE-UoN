import { useState, useEffect } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import zxcvbn from "zxcvbn"; //password strength suggestions
import Alert from "../components/Alert";
import BackBtn from "../components/BackBtn";

const Registration = () => {

    const [showAlert, setShowAlert] = useState(false);

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
                }
            })
            .catch((error) => {
                setShowAlert(true);
                setAlert({
                    title: "Error!",
                    content: `Member already registered. Log in! If the issue persists, try again in a few hours  ${error}`
                })
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
                    <BackBtn/>
                    <div className="card w-80 register-card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <legend>Register</legend>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" name="name" value={registrationForm.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Student Reg. Number</label>
                                    <input className="form-control" name="reg_no" value={registrationForm.reg_no} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="year">Year of Study</label>
                                    <select className="form-control" name="year" id="year" onChange={handleChange} value={registrationForm.year}>
                                        <option value="" disabled>SELECT</option>
                                        <option>I</option>
                                        <option>II</option>
                                        <option>III</option>
                                        <option>IV</option>
                                        <option>V</option>
                                        <option>Postgraduate</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">IEEE Member Number</label>
                                    <input className="form-control" name="ieee_no" id="ieee_no" type="number" value={registrationForm.ieee_no} onChange={handleChange} placeholder="Leave blank if none" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control" name="email" type="email" value={registrationForm.email} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Telephone</label>
                                    <input className="form-control" name="phone" type="tel" value={registrationForm.phone} onChange={handleChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Password</label>
                                    <input className="form-control" name="password" type="password" value={registrationForm.password} onChange={handleChange} required />
                                    <PasswordStrengthBar password={registrationForm.password} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Confirm Password</label>
                                    <input className="form-control" name="password" type="password" value={confirmPass} onChange={handleConfirm} required />
                                    {!confirmed && registrationForm.password.length && confirmPass.length != 0 > 0 && <p style={{ color: "red" }}>Passwords do not match</p>}
                                </div>
                                <p style={{ color: "blue" }}>{passwordStrength}</p>
                                <br />
                                <button type="submit" className="btn btn-primary" disabled={!confirmed && registrationForm.year != ""}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration;
