import './RecomendedBooks.css'

import { selectRandomBooks } from '../../store/slices/book/bookSlice'
import { getRandomBooks } from '../../store/slices/book/bookAPI'
import { fileInstance } from '../../api/file'
import ROUTES from '../../routes/routes'

import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function RecomendedBooks() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ booksLoading, setBooksLoading ] = useState(true)
  const books = useSelector(selectRandomBooks)  

  useLayoutEffect(() => {
    if (books?.length === 0 && booksLoading) {
      dispatch(getRandomBooks(4))
      setBooksLoading(false)
    }
  }, [ dispatch, books, booksLoading ])

  return (
    <div className='recomended_books'>
      <p className="recomended_books_title">Recomended books</p>
      <div className="random_books">
        {
          books?.map(e => 
            <div onClick={() => navigate(`${ROUTES.BOOKS}/${e._id}`)} key={e._id} className="random_book">
              <img src={`${fileInstance}${e.img}`} alt="" loading='lazy' className="random_book_img" />
              <p className="random_book_name">{e.name}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RecomendedBooks