import axios from "axios";
import { useEffect ,useState} from "react";
import "./Friendlist.css";
import {StateHandler} from "../login/context/Authcontext"

function Friendlist({conversation}) {
   
    const {user} = StateHandler()
    const [chatFriends , setChatFriends] = useState(null)


    useEffect(()=>{
        const getUser = async()=>{
            const friendsId = conversation?.members.find((id)=>id !== user._id)

            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user?userId=${friendsId}`)
            setChatFriends(res.data)
        }
        getUser()
    },[conversation , user])

    return (
        <div className="friendlist">
            <img
            src={chatFriends?.profilePicture ? chatFriends?.profilePicture : "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
            alt=""
            className="chatuser-Image"
            />
            <p>{chatFriends?.userName}</p>
        </div>
    )
}

export default Friendlist
