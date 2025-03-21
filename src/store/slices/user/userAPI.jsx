import axiosInstance from "../../../api/axios"

import { createAsyncThunk } from "@reduxjs/toolkit"

export const sendMessage = createAsyncThunk(
  'user/sendMessage',
  async ({ values, resetForm }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`user/message`, values)
      resetForm()
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)