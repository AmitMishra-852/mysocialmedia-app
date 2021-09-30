import React from 'react';
import "./Sidebarrow.css"

function Sidebarrow({ Icon, title }) {
    return (
        <div className="sidebarrow">
            <Icon className="sidebarrow-icon"/>
            <div className="sidebarrow-title">{title}</div>
        </div>
    )
}

export default Sidebarrow
