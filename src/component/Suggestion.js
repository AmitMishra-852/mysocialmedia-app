import React from 'react'
import "./Suggestion.css";
import { Link } from 'react-router-dom';

function Suggestion({item}) {
    return (
            <Link to={`/profile/${item.userName}`} style={{textDecoration:"none", color:"black"}}>
                <div className="userFriends">
                    <img
                        className="userFriends-img"
                        src={item.profilePicture || "https://image.flaticon.com/icons/png/512/709/709699.png"}
                        alt=""
                    />
                    <p className="userFriends-name">{item.userName}</p>
                </div>
            </Link>
    );
}

export default Suggestion;
 