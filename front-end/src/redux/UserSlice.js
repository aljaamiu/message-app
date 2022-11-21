import { createSlice } from '@reduxjs/toolkit';
import { signIn, logout, signUp, getUsers, blockUser, unblockUser, getMessage, sendMessage, getBlockedUsers} from '../routes/UserAction';
import { socketOnBlock, socketOnMessage, socketOnUser} from '../routes/SocketAction';


// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userToken,
  error: null,
  success: false,

  users: null,
  blockedUsers: null,
  selectedUser: null,
  user: null,
  messages: [],
  newMessages: [0,],
}

// initialState.blockedUsers = [1,2,6,7];
// initialState.selectedUser = initialState.users[0];
// initialState.messages = messages;
// console.log(initialState.messages)
initialState.newMessages = [0,];

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      selectUser: (state, action) => {
        console.log(action);
        let newState = { ...state };
        let index = newState.users.map( el => el.id ).indexOf(action.payload);
        newState.selectedUser = newState.users[index];

        // fetch message here
        return newState;
      }
    },

    extraReducers: {
      // on socket block
      [socketOnBlock.pending]: (state) => {
        state.loading = true
      },
      [socketOnBlock.fulfilled]: (state, { payload }) => {
        const newState = { ...state };
        console.log('block', payload)

        const user_id = parseInt(payload.user_id);
        const users = payload.users;

        if (newState.selectedUser) {
          if (user_id === newState.selectedUser.id) {
            newState.messages = [];
            newState.selectedUser = null;
          }
        }
        newState.users = users;
        newState.loading = false;

        return newState;
      },
      [socketOnBlock.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // on socket user
      [socketOnUser.pending]: (state) => {
        state.loading = true
      },
      [socketOnUser.fulfilled]: (state, { payload }) => {
        console.log('user', payload)
        const newState = { ...state };

        const user_id = parseInt(payload.user_id);
        const users = payload.users;

        if (newState.selectedUser) {
          if (user_id === newState.selectedUser.id) {
            newState.messages = [];
            newState.selectedUser = null;
          }
        }
        newState.users = users;
        // newState.success = true;
        newState.loading = false;

        return newState;
      },
      [socketOnUser.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // on socket message
      [socketOnMessage.pending]: (state) => {
        state.loading = true
      },
      [socketOnMessage.fulfilled]: (state, { payload }) => {
        const newState = { ...state };
        console.log('msg', payload)

        const user_id = parseInt(payload.user_id);
        const chats = payload.chats;

        if (newState.selectedUser) {
          if (user_id === newState.selectedUser.id) {

            newState.messages = chats;
            // return newState;
          } else {
            const newMsg = [...newState.newMessages];
            newMsg.push(user_id);
            newState.newMessages = newMsg;
            // newState.newMessages = newState.newMessages.push(user_id);
            // return newState;
          }
        }
        // newState.success = true;
        newState.loading = false;

        return newState;
      },
      [socketOnMessage.rejected]: (state, { payload }) => {
        state.loading = false
      },




      // send message
      [sendMessage.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [sendMessage.fulfilled]: (state, { payload }) => {
        let newState = { ...state };
        newState.messages = payload.chats;
        return newState;
      },
      [sendMessage.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      // login user
      [signIn.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [signIn.fulfilled]: (state, { payload }) => {
        let newState = { ...state };

        newState.user = payload.user;
        newState.users = payload.users;
        // newState.selectedUser = payload.users[0];
        newState.blockedUsers = payload.blocked;
        // newState.success = true;
        newState.loading = false;
        newState.userToken = payload.token;
        
        return newState;
      },
      [signIn.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      // register user
      [signUp.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [signUp.fulfilled]: (state, { payload }) => {
        // console.log(payload)
        let newState = { ...state };
        newState.user = payload.user;
        newState.success = true;
        newState.loading = false;
        newState.userToken = payload.token;

        return newState;
      },
      [signUp.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },
      // get user message
      [getMessage.pending]: (state) => {
        state.loading = true
      },
      [getMessage.fulfilled]: (state, { payload }) => {
        let newState = { ...state };
        let index = newState.users.map( el => el.id ).indexOf(payload.user_id);
        newState.selectedUser = newState.users[index];
        // message read
        if(newState.newMessages.length > 0) {
          if (newState.newMessages.includes(payload.user_id)) {
            newState.newMessages = newState.newMessages.filter(item => item !== payload.user_id);
          }
        }

        newState.messages = payload.data.chats;
        // newState.success = true;
        newState.loading = false;

        return newState;
      },
      [getMessage.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // get users
      [getUsers.pending]: (state) => {
        state.loading = true
      },
      [getUsers.fulfilled]: (state, { payload }) => {
        let newState = { ...state };
        newState.users = payload.users;
        // newState.success = true;
        newState.loading = false;
        
        return newState;
      },
      [getUsers.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // block users
      [blockUser.pending]: (state) => {
        state.loading = true
      },
      [blockUser.fulfilled]: (state, { payload }) => {
        let newState = { ...state };

        newState.users = payload.users;
        newState.blockedUsers = payload.blocked;
        newState.loading = false;
        
        return newState;
      },
      [blockUser.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // unblock user
      [unblockUser.pending]: (state) => {
        state.loading = true
      },
      [unblockUser.fulfilled]: (state, { payload }) => {
        let newState = { ...state };

        newState.users = payload.users;
        newState.blockedUsers = payload.blocked;
        newState.loading = false;
        
        return newState;
      },
      [unblockUser.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // blocked users
      [getBlockedUsers.pending]: (state) => {
        state.loading = true
      },
      [getBlockedUsers.fulfilled]: (state, { payload }) => {
        let newState = { ...state };
        newState.blockedUsers = payload.blockedUsers;
        // newState.success = true;
        newState.loading = false;

        return newState;
      },
      [getBlockedUsers.rejected]: (state, { payload }) => {
        state.loading = false
      },
      // logout
      [logout.pending]: (state) => {
        state.loading = true
      },
      [logout.fulfilled]: (state, { payload }) => {
        localStorage.removeItem('userToken') // delete token from storage

        let newState = { ...state };
        newState.user = null;
        // newState.success = true;
        newState.loading = false;
        newState.userToken = null;
        newState.messages = null;
        newState.selectedUser = null;
        newState.blockedUsers = null;
        
        return newState;
      },
      [logout.rejected]: (state, { payload }) => {
        state.loading = false
      },
    },

  })

// Action creators are generated for each case reducer function
export const { selectUser } = usersSlice.actions

export default usersSlice.reducer