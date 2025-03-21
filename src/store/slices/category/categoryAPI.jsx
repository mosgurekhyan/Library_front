import ROUTES from "../../../routes/routes"
import axiosInstance from "../../../api/axios"
import { addCategory, removeCategory, setCategories, setCategoriesWithsubcategories, updateCategoryInStore } from "./categorySlice"

import { createAsyncThunk } from "@reduxjs/toolkit"

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async ({ values, resetForm, setErr }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post('category', values)
      dispatch(addCategory(res.data))
      resetForm()
    } catch (err) {
      if (err?.response?.data?.message) {
        setErr(err.response.data.message)
        setTimeout(() => {
          setErr(null)
        }, 2500)
      }
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get('category')
      dispatch(setCategories(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.delete(`category/${id}`)
      dispatch(removeCategory(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ values, resetForm, setErr, setSelectedCategory, id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.patch(`category/${id}`, values)
      dispatch(updateCategoryInStore(res.data))
      setSelectedCategory(null)
      resetForm()
    } catch (err) {
      if (err?.response?.data?.message) {
        setErr(err.response.data.message)
        setTimeout(() => {
          setErr(null)
        }, 2500)
      }
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getCategoriesWithsubcategories = createAsyncThunk(
  'category/getCategoriesWithsubcategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get('category/with-subcategories')
      console.log('res',res)
      dispatch(setCategoriesWithsubcategories(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)