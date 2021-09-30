import "./Profilescreen.css";
import { useEffect, useState } from "react";
import Feed from "../component/Feed";
import { useParams } from "react-router"
import Righthomepage from "../component/Righthomepage";
import Header from '../component/Header';
import axios from "axios";
import {Link} from "react-router-dom" ;



function Profilescreen({ click }) {

    const { userName } = useParams();

    const [User, setUser] = useState();
    console.log("user",User)
    const [profilePost, setProfilePost] = useState();
    // const [imageFile, setImageFile] = useState(null)
    // console.log(imageFile)

    useEffect(() => {
        const profileUserFunc = async () => {
            const getUserProfile = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user?userName=${userName}`)
            setUser(getUserProfile.data)
            // console.log(getUserProfile.data)
        }
        profileUserFunc()
    }, [userName])

    useEffect(() => {
        const getAllPost = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/post/profile/${User?.userName}`)
            setProfilePost(res.data.userAllPost)
        }
        getAllPost()
    }, [User?.userName])


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
                                    src={User?.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="profileRight">
                            <p className="profileusername">{User?.userName}</p>
                            <div className="profileinfo">
                                <span className="userInfo"><span className="info-bold">{profilePost?.length}</span> post</span>

                                <span className="userInfo"><span className="info-bold">{User?.followers.length}</span> followers</span>
                                <span className="userInfo"><span className="info-bold">{User?.following.length}</span> following</span>
                            </div>
                        </div>
                    </div>
                    <div className="profileRightbottom">
                        <Feed key={User?._id} username={User?.userName} />
                        <Righthomepage User={User} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profilescreen
