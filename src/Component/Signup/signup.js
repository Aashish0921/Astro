import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Common-Componet/common.css";
import "../Login/login.css";
import logo from "../Assets/logo.svg";
import Logo from "../Assets/Logo.svg";
import password1 from "../Assets/password1.svg";

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const onButtonClick = () => {
        setEmailError("");
        setPasswordError("");

        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }

        logIn();
    };

    const logIn = () => {
        fetch("http://10.0.0.133:8000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    localStorage.setItem("token", data.token);
                    navigate("/home");
                } else {
                    window.alert("Wrong email or password");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert("An error occurred while logging in");
            });
    };

    return (
        <div className="login-container common-margin">
            <div className="left-login-container">
                <h1>Get started with Akira AI</h1>
                <div className="akira-ai">
                    <div className="akira-ai-function">
                        <img src={logo} alt="logo" />
                        <div className="function-wrapper">
                            <h3>Evolution of Agentic AI</h3>
                            <p>Unify the Data with a Data Intelligence Platform to develop Generative AI applications
                                and discover insights from your data using natural language.
                            </p>
                        </div>
                    </div>
                    <div className="akira-ai-function">
                        <img src={logo} alt="logo" />
                        <div className="function-wrapper">
                            <h3>Evolution of Agentic AI</h3>
                            <p>Unify the Data with a Data Intelligence Platform to develop Generative AI applications
                                and discover insights from your data using natural language.
                            </p>
                        </div>
                    </div>
                    <div className="akira-ai-function">
                        <img src={logo} alt="logo" />
                        <div className="function-wrapper">
                            <h3>Evolution of Agentic AI</h3>
                            <p>Unify the Data with a Data Intelligence Platform to develop Generative AI applications
                                and discover insights from your data using natural language.
                            </p>
                        </div>
                    </div>
                    <div className="akira-ai-function">
                        <img src={logo} alt="logo" />
                        <div className="function-wrapper">
                            <h3>Evolution of Agentic AI</h3>
                            <p>Unify the Data with a Data Intelligence Platform to develop Generative AI applications
                                and discover insights from your data using natural language.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
            <div className="right-login-container">
                <img src={Logo} alt="logo" />
                <div className="loginDetails">
                    <div className="loginDetailsWrapper">
                        <h1>Login</h1>
                        <div className="input1">
                            <input value={email} type="text" placeholder="User Name" onChange={(ev) => setEmail(ev.target.value)} />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <div className="input1">
                            <input value={email} type="text" placeholder="E-mail ID" onChange={(ev) => setEmail(ev.target.value)} />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <div className="input1">
                            <input value={password} type={showPassword ? "text" : "password"} placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
                            <img src={password1} alt="password1" onClick={() => setShowPassword(!showPassword)} /> {/* Toggle password visibility */}
                            <label className="errorLabel">{passwordError}</label>
                        </div>
                        <div className="input1">
                            <input value={password} type={showPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(ev) => setPassword(ev.target.value)} />
                            <img src={password1} alt="password1" onClick={() => setShowPassword(!showPassword)} /> {/* Toggle password visibility */}
                            <label className="errorLabel">{passwordError}</label>
                        </div>
                        <div className="loginButton" onClick={onButtonClick} value={'Log in'}>
                            <p>Login</p>
                        </div>
                        <div className="switch-page">
                            <p>Haven’t got an account? </p>
                            <div className="link-to-switch">
                                <p><u>Sign up</u></p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default SignUp;