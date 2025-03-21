import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    randomBooks: [],
    randomManyBooks: [],
    filteredBooks: [],
    booksWithSubcategory: [],
    takenBooks: [],
    showBooks: false,
    uniqueBook: null,
    message: null
  },
  reducers: {
    setTakenBooks (state, { payload }) {
      state.takenBooks = payload
    },
    setMessage (state, { payload }) {
      state.message = payload
    },
    setBooksWithSubcategory (state, { payload }) {
      state.booksWithSubcategory = payload
    },
    setUniqueBook (state, { payload }) {
      state.uniqueBook = payload
    },
    setBooks (state, { payload }) {
      state.books = payload
    },
    setShowBooks (state, { payload }) {
      state.showBooks = payload
    },
    addBook(state, { payload }) {
      state.books.push(payload)
    },
    removeBook(state, { payload }) {
      state.books = state.books.filter(e => e._id !== payload)
    },
    updateBookInStore(state, { payload }) {
      state.books = state.books.map(e =>
        e._id === payload._id ? { ...e, ...payload } : e
      )
    },
    setRandomBooks (state, { payload }) {
      state.randomBooks = payload
    },
    setRandomManyBooks (state, { payload }) {
      state.randomManyBooks = payload
    },
    filterBooks(state, { payload }) {
      const searchTerm = payload.toLowerCase().trim()

      if (!searchTerm) {
        state.filteredBooks = []
        state.showBooks = false
        return
      }

      state.showBooks = true

      state.filteredBooks = state.books.filter(book =>
        book.name.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.subcategory.toLowerCase().includes(searchTerm)
      )
    }
  }
})

export const selectBooks = state => state.book.books
export const selectRandomBooks = state => state.book.randomBooks
export const selectFilteredBooks = state => state.book.filteredBooks
export const selectShowBooks = state => state.book.showBooks
export const selectRandomManyBooks = state => state.book.randomManyBooks
export const selectBooksWithSubcategory = state => state.book.booksWithSubcategory
export const selectUniqueBook = state => state.book.uniqueBook
export const selectMessage = state => state.book.message
export const selectTakenBooks = state => state.book.takenBooks

export const { setBooks, addBook, removeBook, updateBookInStore, setRandomBooks, filterBooks, setRandomManyBooks, setBooksWithSubcategory, setShowBooks, setUniqueBook, setMessage, setTakenBooks } = bookSlice.actions

export const bookReducer = bookSlice.reducer