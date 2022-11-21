import React from 'react';

import './User-Profile.css';

const ChatSearch = (props) => {
    return (
        <div id="profile-container">
                <img src={require("../../assets/images/icons/profile.jpg")} alt="my profile" />
                <div className="title-text">{props.User.email}</div>
                <div className="profile-name">{props.User.name}</div>
        </div>
    );
}

export default ChatSearch;