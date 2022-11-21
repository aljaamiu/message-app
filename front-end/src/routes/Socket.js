import { useSelector, useDispatch } from 'react-redux';
import { socketOnBlock, socketOnMessage, socketOnUser } from './SocketAction';

const SocketHelper = ({type, user_id}) => {

    // const selectedUser = useSelector((state) => state.user.selectedUser);
    // const user = useSelector((state) => state.user.user);
    // const dispatch = useDispatch();
    console.log('called now')
    // const selectedUser = {id:2, name: "yeu"};
    // const user = {id:2, name: "yeu"};

    // if (user_id, selectedUser, user) {
    //     if (type === 'message') {

    //         if (user.id !== user_id) {
    //             if (user_id === selectedUser.id) {
    //                 dispatch(socketOnMessage({user_id: user_id}));
    //             }
    //         }

    //     } else if (type === 'user-left') {
    //         if (user.id !== user_id) {
    //             dispatch(socketOnUser({user_id: user_id}));
    //         }
    //     } else if (type === 'user-join') {
    //         if (user.id !== user_id) {
    //             dispatch(socketOnUser({user_id: user_id}));
    //         }
    //     } else if (type === 'block') {
    //         if (user.id !== user_id) {
    //             dispatch(socketOnBlock({user_id: user_id}));
    //         }
    //     } else if (type === 'unblock') {
    //         if (user.id !== user_id) {
    //             dispatch(socketOnBlock({user_id: user_id}));
    //         }
    //     }
    // }
}

export default SocketHelper;