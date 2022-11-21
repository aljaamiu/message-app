import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

let url = 'https://emychatserver.herokuapp.com';
url = 'http://localhost:3003';

export const signIn = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${url}/api/user/login`,
        { email, password },
        config
      )

      // store user's token in local storage
      localStorage.setItem('userToken', data.token)

      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const signUp = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${url}/api/user/register_user`,
        { name, email, password },
        config
      )
      localStorage.setItem('userToken', data.token)

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

export const logout = createAsyncThunk(
  'user/logout',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }

      const { data } = await axios.get(`${url}/api/user/logout`, config)

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

export const getUsers = createAsyncThunk(
  'user/users',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }

      const { data } = await axios.get(`${url}/api/user/get_users`, config)
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

export const getBlockedUsers = createAsyncThunk(
  'user/blocked_users',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }

      const { data } = await axios.get(`${url}/api/user/blocked_users`, config)
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

export const sendMessage = createAsyncThunk(
    'user/sendmessage',
    async ({msg, to_user_id, message_type, from_user_id}, { getState, rejectWithValue }) => {
      try {
        // get user data from store
        const { user } = getState()

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.userToken}`,
          },
        }
  
        const { data } = await axios.post(
          `${url}/api/message/send_message`,
          {msg, to_user_id, message_type, from_user_id},
          config
        )
  
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

export const getMessage = createAsyncThunk(
    'usere/messages',
    async ({ user_id }, { getState, rejectWithValue }) => {
      try {
        // get user data from store
        const { user } = getState()
  
        // configure authorization header with user's token
        const config = {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
  
        const { data } = await axios.get(`${url}/api/message/get_messages/${user_id}`, config)

        return {
          data: data,
          user_id: user_id
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const blockUser = createAsyncThunk(
    'user/block',
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

        const { data } = await axios.get(`${url}/api/user/block_user/${user_id}`, config)
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

  export const unblockUser = createAsyncThunk(
    'user/unblock',
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
  
        const { data } = await axios.get(`${url}/api/user/unblock_user/${user_id}`, config)
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
