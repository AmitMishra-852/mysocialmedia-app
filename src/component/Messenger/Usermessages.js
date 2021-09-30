import "./Usermessages.css"
import {format} from "timeago.js"

function Usermessages({ messages , own}) {

    return (
            <div className="main-message">
                <div className={own ? "usermessage own" : "usermessage"} >
                    <div className="messages">
                        <p className="user">Tanay Pratab</p>
                        <p className="usertext">{messages.text}  </p>
                        <p className="messagetime">{format(messages.createdAt)}</p>
                    </div>
                </div>
            </div>
    )
}

export default Usermessages
