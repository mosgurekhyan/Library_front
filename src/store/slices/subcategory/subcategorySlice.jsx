import { createSlice } from '@reduxjs/toolkit'

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: {
    subcategories: [],
    subcategoriesWithbooks: [],
    activeSubcategory: null,
    activeName: null
  },
  reducers: {
    setActiveSubcategory (state, { payload }) {
      state.activeSubcategory = payload
    },
    setActiveName (state, { payload }) {
      state.activeName = payload
    },
    setSubcategoriesWithbooks (state, { payload }) {
      state.subcategoriesWithbooks = payload
    },
    setSubCategories (state, { payload }) {
      state.subcategories = payload
    },
    addSubCategory(state, { payload }) {
      state.subcategories.push(payload)
    },
    removeSubCategory(state, { payload }) {
      state.subcategories = state.subcategories.filter(e => e._id !== payload)
    },
    updateSubCategoryInStore(state, { payload }) {
      state.subcategories = state.subcategories.map(e =>
        e._id === payload._id ? { ...e, ...payload } : e
      )
    }
  }
})

export const selectSubCategories = state => state.subcategory.subcategories
export const selectSubCategoriesWithbooks = state => state.subcategory.subcategoriesWithbooks
export const selectActiveSubcategory = state => state.subcategory.activeSubcategory
export const selectActiveName = state => state.subcategory.activeName

export const { setSubCategories, addSubCategory, removeSubCategory, updateSubCategoryInStore, setActiveSubcategory, setSubcategoriesWithbooks, setActiveName } = subcategorySlice.actions

export const subcategoryReducer = subcategorySlice.reducer