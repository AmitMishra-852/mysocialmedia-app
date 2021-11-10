import React, { useEffect, useState } from 'react';
import "./Feed.css";
import axios from "axios"
import Share from "./Share"
import Post from "./Post"
import { StateHandler } from "./login/context/Authcontext"


function Feed({ username }) {

    const { user } = StateHandler()


    const [posts, setPost] = useState([])
    console.log("posts",posts)

    useEffect(() => {
        const getPostFunc = async () => {
            if (username) {
                const getData = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/post/profile/${username}`)
                setPost(
                    getData?.data.userAllPost.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt)
                    })
                );

            } else if(user){
                const getData = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/post/timeline/${user?._id}`)
                setPost(
                    getData?.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt)
                    })
                );
            }
        }
        getPostFunc();
    }, [username, user])

    console.log("post", posts)

    return (

        <div className="Feed">
            {(!username || username === user.userName) && <Share setPost={setPost}/>}
            {
                posts && posts.map((items) => <Post id={items?._id} post={items} />)
            }
        </div>

    )
}

export default Feed;
