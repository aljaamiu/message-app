import React from 'react';

import './LogOut.css';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../routes/UserAction';

function LogOut(props) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.user);

    const handleCklick = () => { 
        dispatch(logout()); 

        console.log(props.SocketState);
        if (props.SocketState) {
            console.log(props.Socket.id);
            props.Socket.emit("user", `user-left-${userData.id}`);
        }
    };
    
    return (
        <div id="new-message-container">
            <button onClick={handleCklick}>Log Out</button>
        </div>
    );
}

export default LogOut;