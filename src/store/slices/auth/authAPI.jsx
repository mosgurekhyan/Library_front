import { createAsyncThunk } from "@reduxjs/toolkit"
import ROUTES from "../../../routes/routes"
import { selectShowEmailInsertation, selectTemporaryEmail, setShowEmailInsertation, setShowPasswordChanging, setTemporaryEmail, setTokenError, setUser } from "./authSlice"
import axiosInstance from "../../../api/axios"

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ values, resetForm, setErr }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post('auth/register', values)
      dispatch(setTemporaryEmail(res.data))
      resetForm()
    } catch (err) {
      console.log('Error:', err)
      if (err?.response?.data?.message) {
        setErr(err.response.data.message)
        setTimeout(() => {
          setErr(null)
        }, 2500)
      }
      return rejectWithValue(err.message)
    }
  }
)

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ otp, navigate, setErr }, { rejectWithValue, dispatch, getState }) => {
    try {
      let email = selectTemporaryEmail(getState())
      let confirmation = selectShowEmailInsertation(getState())
      const res = await axiosInstance.patch('auth/verify', { email, otp, confirmation })
      if (res.data?.confirmation) {
        dispatch(setShowEmailInsertation(false))
        dispatch(setShowPasswordChanging(true))
      }
      if (res.data?.message === 'user successfully verified') {
        dispatch(setTemporaryEmail(null))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        dispatch(setUser(res.data.user))
        navigate(ROUTES.HOME)
      }
      if (res?.data?.message) {
        setErr(res.data.message)
        setTimeout(() => {
          setErr(null)
        }, 2500)
      }
      return res.data?.user
    } catch (err) {
      if (err?.response?.data) {
        setErr(err.response.data)
        setTimeout(() => {
          setErr(null)
        }, 2500)
      }
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const resendEmail = createAsyncThunk(
  'auth/resendEmail',
  async ({ setSeconds, inputRefs, setIsComplete, setErr }, { rejectWithValue, getState }) => {
    let email = selectTemporaryEmail(getState())
    const res = await axiosInstance.post(`auth/resend/${email}`)
    try {
      if (res.data === 'verification code has been sent') {
        inputRefs.forEach(ref => {
          if (ref.current) {
           ref.current.value = ""
          }
        })
        inputRefs[0]?.current?.focus()
        setIsComplete(false)
        setSeconds(60)
      }
    } catch (err) {
      if (err?.response?.data) {
       setErr(err.response.data)
       setTimeout(() => {
         setErr(null)
       }, 2500)
      }
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ values, navigate, resetForm, setErr }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post('auth/login', values)
      localStorage.setItem('user', JSON.stringify(res.data))
      dispatch(setUser(res.data))
      resetForm()
      if (res.data?.role === import.meta.env.VITE_API_ADMIN_KEY) {
        navigate(ROUTES.ADMIN)
      } else {
        navigate(ROUTES.HOME)
      }
      return res.data
    } catch (err) {
      console.log('Error:', err)
      setErr(err?.response?.data?.message)
      setTimeout(() => setErr(null), 2500)
      return rejectWithValue(err.message)
    }
  }
)

export const sendEmail = createAsyncThunk(
  'auth/sendEmail',
  async (email, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post(`auth/resend/${email}`)
      dispatch(setTemporaryEmail(email))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (password, { rejectWithValue, dispatch, getState }) => {
    let email = selectTemporaryEmail(getState())
    if (!email) {
      throw new Error('email is required for updating user')
    }
    try {
      await axiosInstance.patch(`auth/change-password`, { email, password })
      dispatch(setTemporaryEmail(null))
      dispatch(setShowPasswordChanging(false))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post('auth/refresh')
      dispatch(setTokenError(null))
      console.log('res.data',res.data)
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)