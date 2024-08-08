import Footer from "../components/Footer";
import axios from "axios";
import { useState } from "react";
const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/members/login", { loginForm }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //alert(response.data.token)
                localStorage.setItem("ieeeuon_token", response.data.token)//store token in local storage
                window.location.href = "/";//redirect to home page
            })
            .catch((error) => {
                alert(`${error} Login failed! Please try again`)
            })
            .finally(() => {
                setLoginForm({
                    email: "",
                    password: ""
                })
            })
    }
    return (<>
        <div className="container">
            <div className="inner-div-1">
                <div className="card w-80 login-card">
                    <div className="card-body">
                        <form className="login-form" autoComplete="off" onSubmit={handleSubmit} >
                            <legend><h1>Login</h1></legend>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="email" id="email" name="email" className="form-control" autoComplete="off" value={loginForm.email} onChange={handleChange} required />
                                <label className="form-label" htmlFor="email">Email address</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="password" name="password" className="form-control" autoComplete="off" value={loginForm.password} onChange={handleChange} required />
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    </>)
};

export default Login;