import React, { useEffect, useState } from 'react';
import "./Righthomepage.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StateHandler } from "./login/context/Authcontext";
import Suggestion from './Suggestion';



const HomeRightBar = () => {

    const { user } = StateHandler()


    const [userFriends, setUserFriends] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/users`)
            setUserFriends(res.data)
        }
        getAllUser()
    }, [])

    console.log("userFriends", userFriends)

    return (
        <div className="rightbar">
            <div className="rightbar-currentUser">
                <Link to={`/profile/${user.userName}`} style={{textDecoration:"none", color:"black"}}>
                    <div className="currentUser-wrap">
                        <img
                            src={user.profilePicture}
                            alt=""
                            className="currentUser-wrap-img"
                        />
                        <div className="currentUser-wrap-info">
                            <p className="currentUser-wrap-userName">{user.userName}</p>
                            <p className="currentUser-wrap-welcome"> Welcome to INFocus {user.userName}</p>

                        </div>
                    </div>
                </Link>
            </div>
            <div className="friendZ-list">
                <p className="friends-title">Suggestions For You</p>
                <ul className="friendzzUnorder">
                    {
                        userFriends.map((item) => item._id !== user._id && <Suggestion key={item._id} item={item} />)
                    }
                </ul>
            </div>
        </div>
    );

}

// --------------------------------------------------------------------

const ProfilerightBar = ({ User }) => {

    const { user: currentUser, dispatch } = StateHandler()
    const [userfrnds, setUserFrnds] = useState([]);
    console.log("User",User._id)
    console.log("currentUser",currentUser)

 

    useEffect(() => {
        const friend = async () => {
            const getFrnd = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/friends/${User._id}`)
            setUserFrnds(getFrnd.data.friendsList)
        }
        friend()
    }, [User])

    return (
        <div className="userinfo-and-frnds">
            <div className="userInfo">
                <h3 className="userInfo-title">User Information</h3>
                <div className="userdetail">

                    <div className="userfacts">
                        <span className=""><b>City</b> : </span>
                        <span className="">{User.city}</span>
                    </div>
                    <div className="userfacts">
                        <span className=""><b>From </b>: </span>
                        <span className="">{User.from}</span>
                    </div>
                    <div className="userfacts">
                        <span className=""><b>RelationShip</b> : </span>
                        <span className="">{User.relationship === 1 ? "single" : User.relationship === 2 ? "married" : "-"}</span>
                    </div>

                </div>
            </div>
            <hr />
            <div className="userFrinds">
                <h3>User friends</h3>
                <div>
                    {
                       userfrnds && userfrnds.map((frnd) => {
                            return (

                                <div className="friends">
                                    <Link to={`/profile/${frnd.userName}`} style={{ textDecoration: "none", color: "black" }}>
                                        <img
                                            src={frnd.profilePicture || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
                                            alt="A"
                                        />
                                    </Link >
                                    <p>{frnd.userName}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );

}

function Righthomepage({ User }) {


    return (
        <>
            <div className="Righthomepage">
                {User ? <ProfilerightBar User={User} /> : <HomeRightBar />}
            </div>
        </>
    )
}

export default Righthomepage;
