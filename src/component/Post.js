import { useState, useEffect } from "react"
import './Post.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { StateHandler } from "./login/context/Authcontext";


function Post({ post }) {

    const [Like, setLikes] = useState(post.likes)

    const { user: currentUser } = StateHandler()

    const [User, setUser] = useState({})
    // console.log(User)


    useEffect(() => {
        const getUserFunc = async () => {
            const getUser = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/${post.userId}`)
            setUser(getUser.data.getUser)
        }
        getUserFunc()
    }, [post.userId])


    const LikeHandler = async () => {
        try {
            const res = await axios.post(`https://mediaAppBackend.jerryroy.repl.co/api/post/likes/${post._id}`, {
                currentUserId: currentUser._id
            })
            setLikes(res.data.updateLikes.likes)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
        {
            User ?
            (<div className="post">
                <div className="Postwraper">
                    <div className="post-user-info">
                        <Link to={`/profile/${User.userName}`}>
                            <img
                                className="post-user-image"
                                src={User.profilePicture || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156"}
                                alt=""
                            />
                        </Link>
                        <p className="post-user-name">{User.userName}</p>
                        <span className="post-time-stamp">{format(post.createdAt)}</span>
                    </div>
                </div>
                <div className="postabout">
                    <p className="post-disc">{post.disc} </p>
                    <img
                        className="postabout-image"
                        src={post.img}
                        alt="upload"
                    />
                </div>
                <div className="postlikes">
                    <div>
                        <label onClick={LikeHandler}><ThumbUpAltIcon className="thumbicons" />{Like.length}</label>
                    </div>
                </div>
            </div>) : <div> 0 Post</div>
        }
        </>
    )
}

export default Post

