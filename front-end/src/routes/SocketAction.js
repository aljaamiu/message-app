import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

let url = 'https://emychatserver.herokuapp.com';
url = 'http://localhost:3003';

  // on new message
  export const socketOnMessage = createAsyncThunk(
    'user/socketOnMessage',
    async ({user_id}, { getState, rejectWithValue }) => {
      try {
        // get user data from store
        const { user } = getState()
  
        // configure authorization header with user's token
        const config = {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
  
        const { data } = await axios.get(`${url}/api/socket/socket_on_message/${user_id}`, config)

        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  // on user
  export const socketOnUser = createAsyncThunk(
    'user/socketOnUser',
    async ({user_id}, { getState, rejectWithValue }) => {
      try {
        // get user data from store
        const { user } = getState()
  
        // configure authorization header with user's token
        const config = {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
  
        const { data } = await axios.get(`${url}/api/socket/socket_on_user/${user_id}`, config)

        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  // on block
  export const socketOnBlock = createAsyncThunk(
    'usere/socketOnBlock',
    async ({user_id}, { getState, rejectWithValue }) => {
      try {
        // get user data from store
        const { user } = getState()
  
        // configure authorization header with user's token
        const config = {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
  
        const { data } = await axios.get(`${url}/api/socket/socket_on_block/${user_id}`, config)

        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )
