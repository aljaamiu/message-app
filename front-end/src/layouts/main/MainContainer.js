import React, { useState, useEffect } from 'react';
import UserProfile from '../../components/users/User-Profile';
import UserList from '../../components/users/User-List';
import LogOut from '../../components/users/LogOut';
import ChatTitle from '../../components/header/Header';
import MessageList from '../../components/message/Message-List';
import ChatForm from '../../components/message-form/Message';
// import SocketHelper from '../../routes/Socket';
import { socketOnBlock, socketOnMessage, socketOnUser } from '../../routes/SocketAction';

import './MainContainer.css';

import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../routes/UserAction';
import { io } from "socket.io-client";


let url = 'https://emychatserver.herokuapp.com';
url = 'http://localhost:3003';

const socket = io(`${url}/`);

const MainContainer = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    const users = useSelector((state) => state.user.users);
    const selectedUser = useSelector((state) => state.user.selectedUser);
    const messages = useSelector((state) => state.user.messages);
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            console.log('connected');
            socket.emit("user", `user-join-${user.id}`);
        });
    
        socket.on('disconnect', (reason) => {
            if (reason === "io server disconnect") {
                socket.emit("user", `user-left-${user.id}`);
                socket.connect();
            } else {
                socket.emit("user", `user-left-${user.id}`);
                setIsConnected(false);
                console.log('disconnected')
            }
            
        });

        socket.on('update', (msg) => {
            console.log("########  update  ##########");
            console.log('message: ' + msg);
            console.log(new Date().toISOString());
            console.log("######## ++++++++  ##########");

            if (msg.split('-').length > 1) {
                if (msg.split('-')[0] === 'user') {
                    console.log('user-----')
                    let user_id = msg.split('-')[2]+'-'+msg.split('-')[1];
                    dispatch(socketOnUser({user_id: user_id}));
                } else if (msg.split('-')[0] === 'block') {
                    console.log('block-----')
                    let user_id = msg.split('-')[1];
                    dispatch(socketOnBlock({user_id: user_id}));
                } else if (msg.split('-')[0] === 'message') {
                    console.log('message-----')
                    let user_id = msg.split('-')[1];
                    dispatch(socketOnMessage({user_id: user_id}));
                }
            }
        });
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('update');
        };
    }, []);

    return (
        <div id="chat-container">
            <UserProfile User={user}/>
            <UserList Users={users} />
            <LogOut Socket={socket} SocketState={isConnected}/>
            <ChatTitle selectedUser={selectedUser} Socket={socket} SocketState={isConnected}/>
            <MessageList messages={messages} />
            <ChatForm Socket={socket} SocketState={isConnected}/>
        </div>
    );
}

export default MainContainer;