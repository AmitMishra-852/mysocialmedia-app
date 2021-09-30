import "./Messenger.css"
import { useState, useEffect } from "react"
import Friendlist from "./Friendlist";
import Usermessages from "./Usermessages"
import { StateHandler } from "../login/context/Authcontext";
import Header from "../Header";
import { useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";


function Messenger({ click }) {

    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessages, setNewMessages] = useState("");
    const [messages, setMessages] = useState([]);
    const [onlineFriends, setOnlineFriend] = useState();
    const [arrivalMwessage, setArrivalMwessage] = useState(null);
    console.log(onlineFriends)

    const socket = useRef()
    const scrollTOMsg = useRef()
    const { user } = StateHandler()
    console.log(user._id)

    useEffect(() => {
        socket.current = io("ws://localhost:8000")
        socket.current.on("getMessage", (data) => {
            setArrivalMwessage({
                sender: data.senderId,
                text: data.text,
                createAt: Date.now()
            });
        });
    }, [])

    useEffect(() => {
        arrivalMwessage && currentChat?.members.includes(arrivalMwessage?.sender) &&
            setMessages((prev) => [...prev, arrivalMwessage]);
    }, [arrivalMwessage, currentChat]);


    useEffect(() => {
        socket.current.emit("addUser", user?._id)
        socket.current.on("message", message => {
            console.log(message)
        })
        socket.current.on("getUsers", users => {
            setOnlineFriend(users)

        })
    }, [user?._id])


    useEffect(() => {
        const getConversation = async () => {
            const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/conversation/${user?._id}`)
            setConversation(res.data)
        }
        getConversation()
    }, [user?._id])



    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`https://mediaAppBackend.jerryroy.repl.co/api/messages/${currentChat._id}`);
                setMessages(res.data)
                // console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])


    const clickHancler = async (e) => {
        e.preventDefault()

        const newMsg = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessages
        }

        const friendId = currentChat.members.find((id) => id !== user._id)
        console.log(friendId)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: friendId,
            text: newMessages
        })

        try {
            const res = await axios.post("https://mediaAppBackend.jerryroy.repl.co/api/messages", newMsg)
            setMessages([...messages, res.data.saveMessage])
            setNewMessages(" ")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollTOMsg.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <Header click={click} />
            <div className="messenger">

                <div className="chafrnds">
                    <Link to={`/profile/${user.userName}` } style={{textDecoration:"none",color:"black"}}>
                        <div className="chat-currentUser">
                            <img
                                className="chat-current-userImg"
                                src={user.profilePicture}
                                alt=""
                            />
                            <p className="chat-current-userName">{user.userName}</p>
                        </div>
                    </Link>
                    {
                        conversation && conversation.map((c) =>
                            <div className="friendList" onClick={() => setCurrentChat(c)}>
                                <Friendlist conversation={c} />
                            </div>
                        )
                    }
                </div>

                <div className="message">
                    {
                        currentChat ?
                            (
                                <>
                                    <div className="messagebox">
                                        {
                                            messages.map((m) => (
                                                <div ref={scrollTOMsg}>
                                                    <Usermessages messages={m} own={m.sender === user._id} />
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="chatboxbottom">
                                        <textarea value={newMessages} placeholder="Write Something...." className="chatbox" onChange={(e) => setNewMessages(e.target.value)}></textarea>
                                        <button className="sendButton" onClick={clickHancler}>Send</button>
                                    </div>
                                </>
                            ) : (<div className="noChatMsg">open a conversation to start chat</div>)
                    }
                </div>
            </div>
        </>
    )
}

export default Messenger
