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
            <div className="birthdayreminder">
                <img
                    className="birthday-image"
                    src="https://freepngimg.com/thumb/gift/11-2-gift-high-quality-png.png"
                    alt="birthday"
                />
                <span className=""> <b>tanvi priya</b> and <b> 4 other people </b>have birthday today</span>
            </div>
            <img
                className="advertising-image"
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
                alt="adverting"
            />
            <div className="friendZ-list">
                <p className="friends-title">Suggestions For You</p>
                <ul className="friendzzUnorder">
                    {
                        userFriends.map((item) => item._id !== user._id && <Suggestion key={item._id} item={item}/>)
                    }
                </ul>
            </div>
        </div>
    );

}

// --------------------------------------------------------------------

const ProfilerightBar = ({ User }) => {

    const [userfrnds, setUserFrnds] = useState([]);
    const { user: currentUser, dispatch } = StateHandler()
    const [followed, setFollowed] = useState(currentUser.following.includes(User._id));

    console.log(userfrnds)
    // console.log(currentUser)

    const followHandler = async () => {

        if (followed) {
            try {
                const unfollow = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${User._id}/unfollow`, { userId: currentUser._id })
                console.log(unfollow)
                dispatch({ type: "UNFOLLOW", payLoad: User._id })
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const follow = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${User._id}/follow`, { userId: currentUser._id })
                console.log(follow)
                dispatch({ type: "FOLLOW", payLoad: User._id })
            } catch (err) {
                console.log(err)
            }
        }
        setFollowed(!followed)

    }

    useEffect(() => {
        const friend = async () => {
            const getFrnd = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/friends/${User._id}`)
            setUserFrnds(getFrnd.data.friendsList)
        }
        friend()
    }, [User])
    // console.log(userfrnds)


    return (
        <div className="userinfo-and-frnds">
            {
                User.userName !== currentUser.userName && (
                    <div className="follow">
                        <button onClick={followHandler}>{followed ? "unfollow" : "follow"}</button>
                    </div>
                )
            }
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
                        userfrnds.map((frnd) => {
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
