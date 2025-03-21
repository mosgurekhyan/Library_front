import { loginUser, verifyEmail } from './authAPI'

import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem(`user`)) || null,
    showEmailInsertation: false,
    temporaryEmail: null,
    showPasswordChanging: false,
    tokenError: null
  },
  reducers: {
    setTokenError (state, { payload }) {
      state.tokenError = payload
    },
    setTemporaryEmail (state, { payload }) {
      state.temporaryEmail = payload
    },
    setShowEmailInsertation (state, { payload }) {
      state.showEmailInsertation = payload
    },
    setShowPasswordChanging (state, { payload }) {
      state.showPasswordChanging = payload
    },
    setUser (state, { payload }) {
      state.user = payload
    },
    logout: state => {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: builder => {
    builder
    .addCase(verifyEmail.fulfilled, (state, { payload }) => {
      state.user = payload
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  }
})

export const currentUser = state => state.auth.user
export const selectTemporaryEmail = state => state.auth.temporaryEmail
export const selectShowEmailInsertation = state => state.auth.showEmailInsertation
export const selectShowPasswordChanging = state => state.auth.showPasswordChanging
export const selectTokenError = state => state.auth.tokenError

export const { setTemporaryEmail, setShowEmailInsertation, setShowPasswordChanging, setUser, logout, setTokenError } = authSlice.actions

export const authReducer = authSlice.reducer