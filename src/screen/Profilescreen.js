import "./Profilescreen.css";
import { useEffect, useState } from "react";
import Feed from "../component/Feed";
import { useParams } from "react-router"
import Righthomepage from "../component/Righthomepage";
import Header from '../component/Header';
import axios from "axios";
import { StateHandler } from "../component/login/context/Authcontext";
import { Link } from "react-router-dom";



function Profilescreen({ click }) {
    const { userName } = useParams();
    const { user: currentUser, dispatch } = StateHandler()
    const [profileUser, setProfileUser] = useState({});
    console.log("user", currentUser.following)
    console.log("profile-user", profileUser?._id)
    const [profilePost, setProfilePost] = useState([]);
    // const [followed, setFollowed] = useState(currentUser.following.includes(profileUser._id))
    // console.log("followed", followed)



    useEffect(() => {
        const profileUserFunc = async () => {
            const getUserProfile = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user?userName=${userName}`)
            setProfileUser(getUserProfile.data)
            console.log("profileUser", getUserProfile.data)
        }
            profileUserFunc()
    }, [userName])

    useEffect(() => {
        const getAllPost = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/post/profile/${profileUser?.userName}`)
            setProfilePost(res.data.userAllPost)
        }
        getAllPost()
    }, [profileUser?.userName])

    
    
    // const followUserHandler=async()=>{
    //     if (followed) {
    //         try {
    //             const unfollow = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${profileUser._id}/unfollow`, { userId: currentUser._id })
    //             console.log(unfollow)
    //             dispatch({ type: "UNFOLLOW", payLoad: profileUser._id })
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     } else {
    //         try {
    //             const follow = await axios.put(`https://mediaAppBackend.jerryroy.repl.co/api/user/${profileUser._id}/follow`, { userId: currentUser._id })
    //             console.log(follow)
    //             dispatch({ type: "FOLLOW", payLoad: profileUser._id })
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     setFollowed(!followed)
    // }

    return (
        <>
            <Header click={click} />
            <div className="profile">
                <div className="profilepage">
                    <div className="profilescreen">
                        <div className="profileimg">
                            <Link to="/edit">
                                <img
                                    className="profileuserimg"
                                    src={profileUser?.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="profileRight">
                            <p className="profileusername">{profileUser && profileUser?.userName}</p>
                            <div className="profileinfo">
                                <span className="userInfo"><span className="info-bold">{profilePost?.length}</span> post</span>
                                <span className="userInfo"><span className="info-bold">{profileUser.followers?.length}</span> followers</span>
                                <span className="userInfo"><span className="info-bold">{profileUser.following?.length}</span> following</span>
                            </div>
                            {/* {
                                userName !== currentUser.userName && (
                                    <button className="followbtn" onClick={followUserHandler}>{followed ? "unFollow" : "Follow"}</button>
                                )
                            } */}
                        </div>
                    </div>
                    <div className="profileRightbottom">
                        <Feed key={profileUser?._id} username={profileUser?.userName}/>
                        <Righthomepage User={profileUser}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profilescreen
