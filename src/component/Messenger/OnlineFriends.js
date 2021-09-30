import { useEffect, useState } from "react";
import "./OnlineFriends.css";
import axios from "axios"

function OnlineFriends({ onlineFriend, currentUserId, setCurrentChat }) {

    const [friends, setFriends] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])

    console.log(onlineFriend)
    console.log(friends)
    console.log(onlineUsers)



    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/friends/${currentUserId}`)
            setFriends(res.data.friendsList)
        }
        getFriends()
    }, [currentUserId])
    console.log(friends)

    useEffect(() => {
        setOnlineUsers(friends.filter((f) =>f._id === onlineFriend.userId))
    }, [friends , onlineFriend])

    return (
        <div classNmae="onlinefriends">
            <div className="chatOnlineFriends">
                <div className="onlineUser">
                    <img
                        className="userImg"
                        src={onlineUsers.profilePicture || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
                        alt=""
                    />
                    <div className="onlinesign"></div>
                </div>
                <span className="username">{onlineUsers.userName}</span>
            </div>

        </div>
    )
}

export default OnlineFriends
