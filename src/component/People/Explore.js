import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Explore.css";
import { StateHandler } from "../login/context/Authcontext"
import axios from 'axios';

function Explore({User}) {

    const { user , dispatch } = StateHandler()
    const [ followed , setFollowed ] = useState(user.following.includes(User._id))

    const followUserHandler = async()=>{
        if(followed){
            const res = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${User._id}/unfollow`,{
                userId:user._id   
            })
            console.log(res.data)
            dispatch({ type: "UNFOLLOW", payLoad: User._id })

        }else{
            const res = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${User._id}/follow`,{
                userId:user._id
            })
            console.log(res.data)
            dispatch({ type: "FOLLOW", payLoad: User._id })

        }
        setFollowed(!followed)
    }

    return (
        <>
            <div className="Explore">
                <div className="Explore-wrap">
                    <Link to={`/profile/${User.userName}`}>
                        <img
                            className="Explore-profile-img"
                            src={User.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                            alt=""
                        />
                    </Link>
                    <p className="Explore-userName">{User.userName}</p>
                </div>
                <span className="Explore-follow-user" onClick={followUserHandler}>{followed ? "unfollow":"Follow"}</span>
            </div>

        </>
    )
}


export default Explore
