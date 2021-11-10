import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Following.css";
import { StateHandler } from "../login/context/Authcontext"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


function Following({following}) {

    const [popup , setPopup] = useState()
    
    const { user , dispatch } = StateHandler()

    const UnfollowHandler =async()=>{
      if(user.following.includes(following._id)){
      const res = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${following._id}/unfollow`,{
        userId:user._id
      })
      setPopup(res.data)
      setTimeout(()=>{
        setPopup("")  
      },3000)
      dispatch({ type: "UNFOLLOW", payLoad:following._id})
      }
    }

    return (
        <>
            {popup && <div className="following-popup">{popup}</div>}
            <div className="followings">
                 <div className="followings-wrap" >
                     <Link to={`/profile/${following.userName}`}>
                        <img
                            className="followings-profile-img"
                            src={following.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                            alt=""
                        />
                     </Link>
                     <p className="followings-userName">{following.userName}</p>
                </div>
                 <span className="following-user" onClick={UnfollowHandler}>unFollow</span>
            </div>
        </>

    )
}

export default Following
