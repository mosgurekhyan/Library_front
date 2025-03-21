import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    categoriesWithsubcategories: []
  },
  reducers: {
    setCategories (state, { payload }) {
      state.categories = payload
    },
    addCategory(state, { payload }) {
      state.categories.push(payload)
    },
    removeCategory(state, { payload }) {
      state.categories = state.categories.filter(e => e._id !== payload)
    },
    updateCategoryInStore(state, { payload }) {
      state.categories = state.categories.map(e =>
        e._id === payload._id ? { ...e, ...payload } : e
      )
    },
    setCategoriesWithsubcategories (state, { payload }) {
      state.categoriesWithsubcategories = payload
    }
  }
})

export const selectCategories = state => state.category.categories
export const selectCategoriesWithsubcategories = state => state.category.categoriesWithsubcategories

export const { setCategories, addCategory, removeCategory, updateCategoryInStore, setCategoriesWithsubcategories } = categorySlice.actions

export const categoryReducer = categorySlice.reducer