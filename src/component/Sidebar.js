import React from 'react';
import "./Sidebar.css";
import Sidebarrow from "./Sidebarrow";
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
// import TelegramIcon from '@material-ui/icons/Telegram';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { StateHandler } from "./login/context/Authcontext";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { Link, useHistory } from "react-router-dom";


function Sidebar({ show, click }) {

    const history = useHistory()

    const { user, dispatch } = StateHandler();

    const logoutHandler = () => {
        if(user){
            localStorage.removeItem('mainUser')
            dispatch({
                type: "LOGOUT-USER"
            })
            history.push('/Login')
        }
    }

    return (
        <div className={show ? "Sidebar show" : "Sidebar"}>
            <Link to={`/profile/${user?.userName}`} className="sidebar-userprofile">
                <div className="sideber-user">
                    <img
                        className="sidebar-userImg"
                        src={user?.profilePicture || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
                        alt="" 
                    />
                    <p className="sidebar-userName">{user?.userName}</p>
                </div>
                <div className="sideBar-Follow-wrap">
                    <span className="sideBar-Follow followme">{user?.followers.length} followers</span>
                    <span className="sideBar-Follow followe">{user?.following.length} following</span>
                </div>
            </Link>
            <Link
                to="/"
                style={{ textDecoration: "none", color: 'black' }}
                onClick={click}
            >
                <Sidebarrow Icon={HomeIcon} title="home" onClick={click} />
            </Link>

            <Link
                to={`/profile/${user?.userName}`}
                style={{ textDecoration: "none", color: 'black' }}
                onClick={click}
            >
                <Sidebarrow Icon={PersonIcon} title="Profile" onClick={click} />
            </Link>
            <hr />
            <Link
                to="/People"
                style={{ textDecoration: "none", color: 'black' }}
                onClick={click}
            >
                <Sidebarrow Icon={PeopleAltOutlinedIcon} title="People" />
            </Link>
            {
                user ? <div className="Logout" onClick={logoutHandler}> <Sidebarrow Icon={LockOpenIcon} onClick={click} title="Log Out" /> </div> :
                    <Link
                        to="/Login"
                        style={{ textDecoration: "none", color: 'black', cursor: "pointer" }}
                        onClick={click}
                    >
                        <Sidebarrow Icon={LockOpenIcon} title="Login" />
                    </Link>
            }
        </div>
    )
}

export default Sidebar;
