import React, { useEffect, useState } from 'react';
import "./People.css";
import Header from '../Header';
import Following from './Following';
import Followers from './Followers';
import Explore from './Explore';
import { StateHandler } from "../login/context/Authcontext"
import axios from 'axios';
import { Link } from 'react-router-dom';

function People({ click, show }) {

    const [state, setState] = useState("following")
    const [followingUsers, setFollowingUsers] = useState([])
    const [followersFriends, setFollowersFriends] = useState([])
    const [currentUserPost, setCurrentUserPost] = useState([])
    const [explore, setExplore] = useState([])

    const { user } = StateHandler()
    console.log("mainuser",user)

    useEffect(() => {
        const getCurrentUserPost = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/post/${user._id}`)
            setCurrentUserPost(res.data.getUser)
        }
        getCurrentUserPost()
    }, [user._id])


    //-------------------unfollowing-----------------------------------------
    useEffect(() => {
        const getAllCurrentUserFollowings = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/friends/${user._id}`)
            setFollowingUsers(res.data.friendsList)
            console.log("friendList",res.data.friendsList)
        }
        getAllCurrentUserFollowings()
    }, [user])


    //--------------------following-----------------------------------------
    useEffect(() => {
        const getFollowersFriends = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/followersFriends/${user._id}`)
            setFollowersFriends(res.data.friendsList)
            console.log("followersFriends",res.data.friendsList)
        }
        getFollowersFriends()
    }, [user])


    //--------------------allUsers------------------------------------------
    useEffect(() => {
        const getAllUser = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/user/users`)
            setExplore(res.data)
        }
        getAllUser()
    }, [])

  console.log("following",followingUsers.length)
  console.log("follower",followersFriends.length)

    return (
        <>
            <Header click={click} />
            <div className="people">
                <div className="people-wrap">
                    <div className="people-currentUser">
                        <div className="currentUser-Profile">
                            <Link to={`/profile/${user.userName}`}>
                                <img
                                    className="people-currentUser-img"
                                    src={user.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                                    alt=""
                                />
                            </Link>
                            <p className="people-currentUser-name">Amit Mishra</p>
                        </div>
                        <div className="people-follows">
                            <p className="following">Following<span> {followingUsers.length}</span></p>
                            <p className="following">Followers <span> {followersFriends.length}</span></p>
                            <p className="following">Post<span> {currentUserPost?.length}</span></p>
                        </div>
                    </div>
                    <div className="people-container">
                        <div className="people-container-wrap">
                            <div className="people-topbar">
                                <p className="follows" onClick={() => setState("following")}>Following</p>
                                <p className="follows" onClick={() => setState("followers")}>Followers</p>
                                <p className="follows" onClick={() => setState("explore")}>Explore</p>
                            </div>
                            <div className="people-user">
                                {state === "following" && followingUsers.map((following) => <Following key={following._id} following={following} />)}
                                {state === "followers" && followersFriends.map((follower) => <Followers key={follower._id} follower={follower} />)}
                                {state === "explore" && explore.map((User) =>User._id !== user._id && <Explore key={User._id} User={User}/> )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default People
