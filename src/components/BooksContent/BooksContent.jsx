import './BooksContent.css'

import { selectBooksWithSubcategory, selectRandomManyBooks } from '../../store/slices/book/bookSlice'
import { getRandomBooks, getWithsubcategory } from '../../store/slices/book/bookAPI'
import { fileInstance } from '../../api/file'
import { selectActiveName } from '../../store/slices/subcategory/subcategorySlice'

import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BooksContent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ booksLoading, setBooksLoading ] = useState(true)
  const books = useSelector(selectRandomManyBooks)
  const uniqueBooks = useSelector(selectBooksWithSubcategory)
  const activeName = useSelector(selectActiveName)

  useLayoutEffect(() => {
    if (activeName) {
      dispatch(getWithsubcategory(activeName))
    }
  }, [dispatch, activeName])

  useLayoutEffect(() => {
    if (!activeName && books?.length === 0 && booksLoading) {
      dispatch(getRandomBooks(10)).finally(() => setBooksLoading(false))
    }
  }, [dispatch, books, booksLoading, activeName])

  return (
    <div className='books_content'>
      { 
        activeName ?
        uniqueBooks?.map(e => 
          <div onClick={() => navigate(`${e._id}`)} key={e._id} className="books_content_book">
            <img src={`${fileInstance}${e.img}`} alt="" className="books_content_book_img" />
            <p className="books_content_book_author">{e.author}</p>
          </div>
        ) :
        books?.map(e => 
          <div onClick={() => navigate(`${e._id}`)} key={e._id} className="books_content_book">
            <img src={`${fileInstance}${e.img}`} alt="" className="books_content_book_img" />
            <p className="books_content_book_author">{e.author}</p>
          </div>
        )
      }
    </div>
  )
}

export default BooksContent