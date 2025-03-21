import { useSelector } from 'react-redux'
import BookList from '../components/BookList/BookList'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

import { Outlet } from 'react-router-dom'
import { selectShowBooks } from '../store/slices/book/bookSlice'

function UserLayout() {
  const show = useSelector(selectShowBooks)

  return (
    <> 
      { show && <BookList/> }
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default UserLayout