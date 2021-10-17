import React from 'react'
import "./Header.css";
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import {NavLink,Link , useHistory } from "react-router-dom";
import { StateHandler } from "./login/context/Authcontext";
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import LockCloseIcon from '@material-ui/icons/LockClose';

function Header({ click }) {

    const { user, dispatch } = StateHandler()
    const history = useHistory()

    const logoutHandler = () => {
        if (user) {
            localStorage.removeItem('mainUser')
            dispatch({
                type: "LOGOUT-USER"
            })
            history.push('/Login')
        }
    }

    return (
        <div className="header">
            <div className="header-left">
                <div className="header-menu" onClick={click} >
                    <MenuIcon />
                </div>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h2 className="header-left-logo">IN<span className="logo-tube">focus</span></h2>
                </Link>
            </div>
            <div className="header-navbar">
                <div className="navber">
                    <NavLink exact activeClassName="active" to="/" style={{ textDecoration: "none", color: "black" }}>
                        <abbr title="Home"><HomeOutlinedIcon className="nav-icons" /></abbr>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/people" style={{ textDecoration: "none", color: "black" }}>
                        <abbr title="people"><PeopleAltOutlinedIcon className="nav-icons" /></abbr>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/login" style={{ textDecoration: "none", color: "black" }}>
                        <abbr title="Logout"><LockOpenIcon className="nav-icons nav" onClick={logoutHandler} /></abbr>
                    </NavLink>
                </div>

                <Link to={`/profile/${user?.userName}`} className="header-userprofile">
                    <p className="header-userName">{user?.userName}</p>
                    <img
                        className="header-userimg"
                        src={user?.profilePicture || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
                        alt=""
                    />
                </Link>
        

            </div>

        </div>

    )
}

export default Header