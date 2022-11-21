import React from 'react';

import UserItem from './User-Item';
import './User-List.css';

import { useSelector } from 'react-redux';

const UserList = () => {

    const selectedUserData = useSelector((state) => state.user.selectedUser);
    const users = useSelector((state) => state.user.users);

    const check = (id) => {
        if (selectedUserData) {
            if (id === selectedUserData.id) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } 

    if(users) {
        const userItems = users.map((user) => {
            return <UserItem 
                key={user.id}
                isActive={check(user.id)}
                user={user}/>;
        });

        if (selectedUserData) {}
    
        return (
            <div id="user-list">
                {userItems}
            </div>
        );

    } else {
        return (
            <div id="user-list">
                <h1>No users</h1>
            </div>
        );
    }
}

export default UserList;