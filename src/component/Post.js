import { useState, useEffect } from "react"
import './Post.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { StateHandler } from "./login/context/Authcontext";


function Post({ post }) {

    const { user: currentUser } = StateHandler()
    const [Like, setLikes] = useState(post.likes)
    const [showComments, setShowComments] = useState(false)
    const [User, setUser] = useState({})
    const [commentInput, setCommentInput] = useState("")
    const [comments, setComments] = useState([])


    console.log(comments)


    console.log(currentUser._id)
    console.log(Like)


    useEffect(() => {
        const getUserFunc = async () => {
            const getUser = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/${post.userId}`)
            setUser(getUser.data.getUser)
        }
        getUserFunc()
    }, [post.userId])

    useEffect(() => {
        const getCommentFunc = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/comment/${post._id}`)
            setComments(res.data.allComments)
        }
        getCommentFunc()
    }, [post])


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


    const commentHandler = async () => {
        try {
            const res = await axios.post(`https://mediaAppBackend.jerryroy.repl.co/api/comment/${post._id}`, {
                postId: post._id,
                commentBy: currentUser._id,
                userName: currentUser.userName,
                userImage: currentUser.profilePicture,
                text: commentInput
            })
            console.log(res.data.allComments)
            setComments(res.data.allComments)
            setCommentInput("")
        } catch (err) {
            
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
                                src={post.img && post.img}
                                alt=""
                            />
                        </div>
                        <div className="postlikes">
                            <div>
                                <label onClick={LikeHandler}>{Like.includes(currentUser._id) ? <ThumbUpAltIcon htmlColor="#8566aa" className="thumbicons" /> : <ThumbUpAltIcon className="thumbicons" />}{Like.length}</label>
                            </div>
                            <div className="post-comment" onClick={() => showComments ? setShowComments(false) : setShowComments(true)}>{comments.length} comments</div>
                        </div>
                        {
                            showComments && (
                                <div className="comment">
                                    <div className="comment-input-area">
                                        <input
                                            className="comment-input"
                                            value={commentInput}
                                            onChange={(e) => setCommentInput(e.target.value)}
                                            placeholder="Add to comments..." />
                                        <button
                                            disabled={!commentInput && "disabled"}
                                            className="input-btn"
                                            onClick={commentHandler}
                                        >Post</button>
                                    </div>
                                    {comments && comments.map((comment) => {
                                        return (
                                            <div className="comment-wrap">
                                                <img
                                                    src={comment.userImage}
                                                    alt=""
                                                    className="comment-user-img"
                                                />
                                                <div className="comment-user-info">
                                                    <div className="comment-userName">{comment.userName}</div>
                                                    <div className="comment-text">{comment.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }
                    </div>
                    ) : <div> 0 Post</div>
            }
        </>
    )
}

export default Post

