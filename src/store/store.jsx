import { authReducer } from './slices/auth/authSlice'
import { categoryReducer } from './slices/category/categorySlice'
import { subcategoryReducer } from './slices/subcategory/subcategorySlice'
import { bookReducer } from './slices/book/bookSlice'
import { sliderReducer } from './slices/slider/sliderSlice'

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  book: bookReducer,
  slider: sliderReducer,
})
  
const persistConfig = { 
  key: 'library', 
  storage,
  blacklist: ['book', 'subcategory']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({
    serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
  })]
})

export const persistor = persistStore(store)
export default store