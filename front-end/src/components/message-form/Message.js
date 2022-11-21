import React, { useState, useEffect } from 'react';

import './Message.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage} from '../../routes/UserAction';
import { io } from "socket.io-client";

function ChatForm(props) {
    const selectedUserData = useSelector((state) => state.user.selectedUser);
    const userData = useSelector((state) => state.user.user);
    

    // console.log('u', userData)
    // console.log('s', selectedUserData)

    // useEffect(() => {
    //     const socket = io("http://localhost:3003/");

    //     socket.on("connect", () => {
    //         console.log(socket.id)
    //     })
    // }, []);

    const blockedUsers = useSelector((state) => state.user.blockedUsers);

    const check = () => {
        if (blockedUsers.includes(selectedUserData.id)) return true
        return false
    }

    const dispatch = useDispatch();
    const [textMessage, setTextMessage] = useState('');
    const handleChange = (e) => {
        setTextMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!check()) {
            if (textMessage.length > 0) {
            
                if (selectedUserData) {
                    dispatch(sendMessage({msg: textMessage, to_user_id: selectedUserData.id, message_type: 1, from_user_id: userData.id}));

                    console.log(props.SocketState);
                    if (props.SocketState) {
                        console.log(props.Socket.id);
                        props.Socket.emit("message", `message-${userData.id}`);
                    }
                }
            }
        }
        
        setTextMessage('');
    };

    return (
        <form id="chat-form" onSubmit={handleSubmit}>
            <button type="submit">
                <img src={require("../../assets/images/icons/send.png")} alt="Send" />
            </button>

            <input 
                type="text" 
                placeholder="type a message" 
                value={textMessage}
                onChange={handleChange} />
        </form> 
    );
}

export default ChatForm;