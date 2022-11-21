import React from 'react';

import './User-Item.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser} from '../../redux/UserSlice';
import classNames from 'classnames';
import { getMessage } from '../../routes/UserAction';

const UserItem = ({ user, isActive }) => {
    const className = classNames('user', {
        'active': isActive
    });
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getMessage({user_id: user.id}));
    };

    const blockedUsers = useSelector((state) => state.user.blockedUsers);
    const newMessages = useSelector((state) => state.user.newMessages);

    const check = (id) => {
        if (blockedUsers.includes(id)) return "blocked"
        return "friend"
    }

    const newMessage = (id) => {
        if(newMessages.length > 0) {
            if (newMessages.includes(id)) return true
        }
        return false
    }

    return (
        <div className={className} onClick={handleClick}>
            <img src={require("../../assets/images/profiles/default.png")} alt={user.name} />
            <div className={newMessage(user.id)? "title-text new-message" : "title-text read-message"}>{user.name}</div>
            <div className="user-status">{check(user.id)}</div>
            <div className="user-email">
                {user.email}
            </div>
        </div>
    );
}

export default UserItem;