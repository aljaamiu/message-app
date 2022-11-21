import React from 'react';

import Message from './Message';
import './Message-List.css';
import { useSelector, useDispatch } from 'react-redux';
import { getMessage } from '../../routes/UserAction';

const MessageList = (props) => {
    const user = useSelector((state) => state.user.user);
    const messages = useSelector((state) => state.user.messages);
    
    // dispatch(getMessage());
    const check = (id) => {
        if (user.id === id) return true
        return false
    }

    if (props.messages) {
        const messageItems = props.messages.map((message, index) => {
            return <Message 
                key={index}
                isMyMessage={check(message.from_user_id)}
                message={message} />;
        });

        return (
            <div id="chat-message-list">
                {messageItems}
            </div>
        );
    } else {
        return (
            <div id="chat-message-list">
                <h1>No messages</h1>
            </div>
        );
    }
    
}

export default MessageList;