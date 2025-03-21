import './BookList.css'

import { selectFilteredBooks, setShowBooks } from '../../store/slices/book/bookSlice'

import { useDispatch, useSelector } from 'react-redux'
import { fileInstance } from '../../api/file'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routes'

function BookList() {
  const filteredBooks = useSelector(selectFilteredBooks)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='books_list'>
      {
        filteredBooks?.length > 0 ? 
        filteredBooks.map(e => (
          <img onClick={() => { navigate(`${ROUTES.BOOKS}/${e._id}`); dispatch(setShowBooks(false)) }} key={e._id} src={`${fileInstance}${e.img}`} alt="" className="books_list_book_img" />
        //   <div key={e._id} className="books_list_book">
        //     <h3>{e.name}</h3>
        //     <p>Category: {e.category}</p>
        //     <p>Subcategory: {e.subcategory}</p>
        //   </div>
        ))
       : <p className='books_list_text'>no books found</p>
      }
    </div>
  )
}

export default BookList