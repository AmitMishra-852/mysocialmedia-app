import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios"



function Register() {
    const [showConfirmpassword , setShowConfirmpassword] = useState(false)
    const [showPassword , setShowPassword] = useState(false)



    const [error , setError] = useState()
    const [registerMessage , setRegisterMessage] = useState()
    const [name , setName] = useState()
    const [email , setEmail] = useState()
    const [password , setPassword] = useState()
    const [confirmpassword , setConfirmpassword] = useState()

    const history = useHistory()

    const Clickhandler = async (e) => {
        e.preventDefault()

        if (password!== confirmpassword) {
            setTimeout(() => {
                setError("") 
                setConfirmpassword("")
                setPassword("")
            }, 3000);
            return setError("your passwords do not match")
        }
        try {
            const res = await axios.post("https://mediaAppBackend.jerryroy.repl.co/api/auth/Register", {
                userName: name,
                email: email,
                password: password
            })
            setRegisterMessage(res.data.message)
            console.log(res.data.message)

            history.push('/Login')
        } catch (err) {
            setTimeout(() => {
                setError("")
            }, 3000);
            setError(err.response?.data.error)
            
        }
    }

    const PasswordShowHandler=()=>{
        if(showPassword){
           setShowPassword(false)
        }else{
           setShowPassword(true)
        }

    }

    const confirmpasswordShowHandler=()=>{
        if(showConfirmpassword){
            setShowConfirmpassword(false)
        }else{
            setShowConfirmpassword(true)
        }
    }
    return (
        <div>
            {error && <p></p>}
            <div className="login">
                <div className="login-logo">
                    <Link to="/"><h2><span className="login-logo-IN">IN</span><span className="login-logo-focus">focus</span></h2></Link>
                </div>
                {error && <span className="register-errorField">{error}</span>}
                {registerMessage && <span className="register-errorField">{registerMessage}</span>}
                <form className="login-info" onSubmit={Clickhandler}>
                    <input 
                       placeholder="userName" 
                       type="name" 
                       required 
                       value={name}
                       onChange={(e)=>setName(e.target.value)} 
                       className="login-input" 
                    />
                    <input 
                       placeholder="Email" 
                       type="email" 
                       required 
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}  
                       className="login-input" 
                    />
                    <input 
                        placeholder="Password" 
                        type={showPassword ?"text":"password"} 
                        required 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        className="login-input"
                    />
                    <input 
                        placeholder="confirm Password" 
                        type={showConfirmpassword ? "text":"password"}
                        required 
                        value={confirmpassword} 
                        onChange={(e)=>setConfirmpassword(e.target.value)} 
                        className="login-input" 
                    />
                    <span className="Register-password-show" onClick={PasswordShowHandler}>{showPassword ?"hide":"show"}</span>
                    <span className="Register-confirmpassword-show" onClick={confirmpasswordShowHandler}>{showConfirmpassword ? "hide":"show"}</span>

                    <button className="signupbtn">Sign up</button>
                </form>
                <p className="signuplink">ALREADY HAVE AN ACCOUNT? <Link to="/Login">LOGIN</Link></p>
            </div>

        </div>
    )
}

export default Register
