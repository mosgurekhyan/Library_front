import axiosInstance from "../../../api/axios"
import { setTokenError } from "../auth/authSlice"
import { addBook, removeBook, setBooks, setBooksWithSubcategory, setMessage, setRandomBooks, setRandomManyBooks, setTakenBooks, setUniqueBook, updateBookInStore } from "./bookSlice"

import { createAsyncThunk } from "@reduxjs/toolkit"

export const createBook = createAsyncThunk(
  'book/createBook',
  async ({ data, resetForm, imgRef, fileRef }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.postForm('book', data)
      dispatch(addBook(res.data))
      if (imgRef.current) imgRef.current.value = ''
      if (fileRef.current) fileRef.current.value = ''
      setTimeout(() => resetForm(), 0)
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get('book')
      dispatch(setBooks(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.delete(`book/${id}`)
      dispatch(removeBook(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const updateBook = createAsyncThunk(
  'book/updateBook',
  async ({ data, resetForm, setSelectedBook, id, imgRef, fileRef }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.patchForm(`book/${id}`, data)
      dispatch(updateBookInStore(res.data))
      setSelectedBook(null)
      imgRef.current.value = ''
      fileRef.current.value = ''
      resetForm()
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getRandomBooks = createAsyncThunk(
  'book/getRandomBooks',
  async (quantity, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get(`book/random/${quantity}`)
      if (quantity === 4) {
        dispatch(setRandomBooks(res.data))
      } else {
        dispatch(setRandomManyBooks(res.data))
      }
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getWithsubcategory = createAsyncThunk(
  'book/getWithsubcategory',
  async (subcategory, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get(`book/subcategory/${subcategory}`)
      dispatch(setBooksWithSubcategory(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getUniqueBook = createAsyncThunk(
  'book/getUniqueBook',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get(`book/${id}`)
      dispatch(setUniqueBook(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const takeBook = createAsyncThunk(
  'book/takeBook',
  async ({ id, bookId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.patch(`book/user`, { id, bookId })
      if (res.data?.message) {
        dispatch(setMessage(res.data))
        setTimeout(() => dispatch(setMessage(null)), 2500)
      } else {
        dispatch(setUniqueBook(res.data))
      }
    } catch (err) {
      dispatch(setTokenError(err?.response?.data?.message))
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const findTakenBooks = createAsyncThunk(
  'book/findTakenBooks',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get(`book/taken/${id}`)
      dispatch(setTakenBooks(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)