import { useLayoutEffect, useState } from 'react'
import { currentUser } from '../../store/slices/auth/authSlice'
import './Profile.css'

import { useDispatch, useSelector } from 'react-redux'
import { selectTakenBooks } from '../../store/slices/book/bookSlice'
import { findTakenBooks } from '../../store/slices/book/bookAPI'
import { fileInstance } from '../../api/file'

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(currentUser)
  const books = useSelector(selectTakenBooks)
  const [ loading, setLoading ] = useState(true)

  useLayoutEffect(() => {
    if (books?.length === 0 && loading) {
      dispatch(findTakenBooks(user._id))
      setLoading(false)
    }
  }, [ books, dispatch, loading, user ])

  return (
    <div className='profile'>
      <div className="profile_detail">
        <div className="profile_detail_container">
          <p className="profile_label">name:</p>
          <p className="profile_label">{user?.fullName}</p>
        </div>
        <div className="profile_detail_container">
          <p className="profile_label">educational institution:</p>
          <p className="profile_label">{user?.educationalInstitution}</p>
        </div>
        <div className="profile_detail_container">
          <p className="profile_label">role:</p>
          <p className="profile_label">{user?.role}</p>
        </div>
        <div className="profile_detail_container">
          <p className="profile_label">profession:</p>
          <p className="profile_label">{user?.profession}</p>
        </div>
      </div>
      <div className="profile_taken_books">
        <p className="profile_taken_books_title">{books?.length === 0 ? 'You have not taken books' : 'Taken books'}</p>
        <div className="profile_taken_books_container">
          {
            books?.map(e => 
              <div key={e._id} className="profile_book">
                <img src={`${fileInstance}${e.img}`} alt="" className="profile_book_img" />
                <p className="profile_book_author">{e.author}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile