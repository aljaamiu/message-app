import React from 'react';
import moment from 'moment'

import './Message.css';

const Message = (props) => {
    let messageClass = 'message-row';
    let imageThumbnail = null;

    if (props.isMyMessage) {
        messageClass += ' you-message';
    } else {
        messageClass += ' other-message';
        imageThumbnail = <img src={require("../../assets/images/profiles/default.png")} alt={props.message.msg} />;
    }

    const formatDate = (date) => {
        if (moment(date).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY'))
            return moment(date).format('hh:mm:ss a');
        else
            return moment(date).fromNow();
    }

    return (
        <div className={messageClass}>
            <div className="message-content">
                {imageThumbnail}
                <div className="message-text">
                    {props.message.msg}
                </div>
                <div className="message-time">{formatDate(props.message.created_at)}</div>
            </div>
        </div>
    );
}

export default Message;