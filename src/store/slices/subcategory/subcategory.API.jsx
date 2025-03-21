import axiosInstance from "../../../api/axios"
import { addSubCategory, removeSubCategory, setSubCategories, setSubcategoriesWithbooks, updateSubCategoryInStore } from "./subcategorySlice"

import { createAsyncThunk } from "@reduxjs/toolkit"

export const createSubCategory = createAsyncThunk(
  'subcategory/createSubCategory',
  async ({ values, resetForm, setErr }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post('subcategory', values)
      dispatch(addSubCategory(res.data))
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

export const getSubCategories = createAsyncThunk(
  'subcategory/getSubCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get('subcategory')
      dispatch(setSubCategories(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const getSubCategoriesWithbooks = createAsyncThunk(
  'subcategory/getSubCategoriesWithbooks',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get('subcategory/with-books')
      dispatch(setSubcategoriesWithbooks(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const deleteSubCategory = createAsyncThunk(
  'subcategory/deleteSubCategory',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.delete(`subcategory/${id}`)
      dispatch(removeSubCategory(res.data))
    } catch (err) {
      console.log('Error:', err)
      return rejectWithValue(err.message)
    }
  }
)

export const updateSubCategory = createAsyncThunk(
  'subcategory/updateSubCategory',
  async ({ values, resetForm, setErr, setSelectedSubCategory, id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.patch(`subcategory/${id}`, values)
      dispatch(updateSubCategoryInStore(res.data))
      setSelectedSubCategory(null)
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