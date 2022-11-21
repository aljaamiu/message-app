import React from 'react';

import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import {blockUser, unblockUser} from '../../routes/UserAction';

const ChatTitle = (props) => {
    const dispatch = useDispatch();
    const selectedUserData = useSelector((state) => state.user.selectedUser);
    const userData = useSelector((state) => state.user.user);

    const blockedUsers = useSelector((state) => state.user.blockedUsers);

    const check = () => {
        if (blockedUsers.includes(selectedUserData.id)) return true
        return false
    }

    const handleCklick = () => {
        dispatch(blockUser({user_id: selectedUserData.id}));

        console.log(props.SocketState);
        if (props.SocketState) {
            console.log(props.Socket.id);
            props.Socket.emit("block", `block-${userData.id}`);
        }   
    };
    
    if (props.selectedUser) {
        return (
            <div id="chat-title">
                <span>{props.selectedUser.name}</span>
                <button onClick={handleCklick} className={check()? 'unblock-button' : 'block-button'} id={check()? 'unblock-button' : 'block-button'}>
                    {check()? '+' : '-'}
                </button>
            </div>
        );
    } else {
        return (
            <div id="chat-title">
                <h1>Welcome</h1>
            </div>
        );
    }
}

export default ChatTitle;