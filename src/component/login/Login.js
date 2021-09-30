import React, { useRef, useState } from 'react';
import "./Login.css";
import { Link } from "react-router-dom";
import { StateHandler } from "./context/Authcontext";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from "@material-ui/core";

function Login() {
    const [loginError, setLoginError] = useState()
    const [Email, setEmail] = useState("lucifar852@gmail.com")
    const [Password, setPassword] = useState("Amit741852")
    const [showPassword, setShowPassword] = useState(false)
    console.log(Email)
    console.log(Password)

    const { user, isFatching, dispatch } = StateHandler()

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN-START" })
        try {
            const res = await axios.post("https://mediaAppBackend.jerryroy.repl.co/api/auth/Login",
                {
                    email: Email,
                    password: Password
                })

            alert(res.data.message)
            dispatch({ type: "LOGIN-SUCCESSFUL", payLoad: res.data.user })
        } catch (err) {
            console.log(err.response?.data.error)
            setLoginError(err.response?.data.error)

            setTimeout(() => {
                setLoginError("")

                setEmail("")
                setPassword("")
            }, 3000)

            dispatch({ type: "LOGIN-FAIL" })
        }

    }

    const PasswordShowHandler = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    return (
        <div className="main-Login">
            <div className="login">
                <div className="login-logo">
                    <Link to="/"><h2><span className="login-logo-IN">IN</span><span className="login-logo-focus">focus</span></h2></Link>
                </div>
                {loginError && <span className="login-error">{loginError}</span>}
                <form className="login-info" onSubmit={handleClick}>
                    <input
                        placeholder="Email"
                        type="email"
                        value={Email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength="8"
                        className="login-input"
                    />
                    <span className="show" onClick={PasswordShowHandler}>{showPassword ? "hide" : "show"}</span>
                    <button className="signinbtn" type="submit" disabled={isFatching} >{isFatching ? <CircularProgress color="white" size="15px" /> : "Log In"}</button>
                </form>
                <p className="signuplink">DON'T HAVE AN ACCOUNT? <Link to="/register">SIGN UP</Link></p>
            </div>
        </div>
    )
}

export default Login
