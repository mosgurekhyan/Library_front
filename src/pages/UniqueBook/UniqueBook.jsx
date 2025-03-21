import './UniqueBook.css'

import { getUniqueBook, takeBook } from '../../store/slices/book/bookAPI'
import { selectMessage, selectUniqueBook } from '../../store/slices/book/bookSlice'
import { fileInstance } from '../../api/file'
import { currentUser } from '../../store/slices/auth/authSlice'
import ROUTES from '../../routes/routes'

import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function UniqueBook() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const book = useSelector(selectUniqueBook)
  const user = useSelector(currentUser)
  const message = useSelector(selectMessage)
  const [ hasTakenBook, setHasTakenBook ] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useLayoutEffect(() => {
    if (id) {
      dispatch(getUniqueBook(id))
    }
  }, [ dispatch, id ])

  useEffect(() => {
    if (book) {
      setHasTakenBook(book?.users?.some(userId => userId.toString() === user?._id))
    }
  }, [ book, user ])

  const handleClick = () => {
    if (user) {
      if (book?.type === 'электронная') {
        window.open(`${fileInstance}${book?.file}`, '_blank')
      } else if (!hasTakenBook && book?.quantity > book?.taken) {
        dispatch(takeBook({ id: user?._id, bookId: book?._id }))
      }
    } else {
      navigate(ROUTES.AUTH)
    }
  }

  return (
    <div className='unique_book'>
      <img src={`${book && fileInstance}${book?.img}`} alt="" className="unique_book_img" /> 
      <div className="unique_book_container">
        <div className="unique_book_detail">
          <p className="unique_book_label">title:</p>
          <p className="unique_book_title">{book?.name}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">author:</p>
          <p className="unique_book_title">{book?.author}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">date:</p>
          <p className="unique_book_title">{book?.date}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">category:</p>
          <p className="unique_book_title">{book?.category}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">subcategory:</p>
          <p className="unique_book_title">{book?.subcategory}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">ISBN:</p>
          <p className="unique_book_title">{book?.isbn}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">pages:</p>
          <p className="unique_book_title">{book?.pages}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">type:</p>
          <p className="unique_book_title">{book?.type}</p>
        </div>
        <div className="unique_book_detail">
          <p className="unique_book_label">description:</p>
          <p className="unique_book_title">{book?.description}</p>
        </div>
        <button
          onClick={handleClick}
          disabled={hasTakenBook || book?.quantity <= book?.taken}
          className="unique_book_btn"
        >
          {hasTakenBook ? 'taken' : book?.type === 'физическая' ? 'take' : 'read'}
        </button>
        { message && <p className='unique_book_message'>{message}</p> }
      </div>
    </div>
  )
}

export default UniqueBook