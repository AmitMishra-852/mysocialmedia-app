import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Followers.css";
import { StateHandler } from "../login/context/Authcontext"

function Followers({ follower }) {

    const [follow , setFollower] = useState("")
    const { user, dispatch } = StateHandler()
    const [followed , setFollowed] = useState(user.following.includes(follower._id))
    console.log("user",user)



    const followersHanlder =async(e)=>{
        e.preventDefault()

        if(followed){
            const res = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${follower._id}/unfollow`,{
                userId:user._id   
            })
            setFollower(res.data)
            setTimeout(()=>{
                setFollower("")
            },3000)
            dispatch({ type: "UNFOLLOW", payLoad: follower._id })

        }else{
            const res = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${follower._id}/follow`,{
                userId:user._id
            })
            setFollower(res.data)
            setTimeout(()=>{
                setFollower("")
            },3000)
            dispatch({ type: "FOLLOW", payLoad: follower._id })

        }
        setFollowed(!followed)
    }

    console.log(followed)
    console.log("followers id",follower._id)

    return (
        <>
            {follow && <span className="followers-popup">{follow}</span>}
            <div className="Followers">
                <div className="Followers-wrap">
                    <Link to={`/profile/${follower.userName}`}>
                        <img
                            className="followers-profile-img"
                            src={follower.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                            alt=""
                        />
                    </Link>
                    <p className="Followers-userName">{follower.userName}</p>
                </div>
                <span className="follow-user" onClick={followersHanlder}>{followed ? "unFollow": "Follow Back"}</span>
            </div>

        </>
    )
}

export default Followers
