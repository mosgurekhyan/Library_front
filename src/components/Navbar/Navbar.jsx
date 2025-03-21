import './Navbar.css'

import logo from '../../assets/images/logo.png'
import ROUTES from '../../routes/routes'
import { NAV_ITEMS } from '../../constants/navItems'
import { filterBooks } from '../../store/slices/book/bookSlice'
import { currentUser, logout } from '../../store/slices/auth/authSlice'

import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ open, setOpen ] = useState(false)
  const user = useSelector(currentUser)

  const handleSearch = debounce((dispatch, value) => {
    dispatch(filterBooks(value))
  }, 300)
  
  const handleChange = e => {
    const value = e.target.value
    setSearchTerm(value)
    handleSearch(dispatch, value)  
  }

  const handleClick = useCallback(event => {
    if (event.target.closest('nav') || event.target.closest('.nav_container')) {
      return
    }
    setOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [ handleClick ])

  return (
    <nav>
      <img onClick={() => navigate(ROUTES.HOME)} src={logo} alt="" className="nav_logo" />
      {
        NAV_ITEMS.map(e => e.name === 'search' ?
          <input
            key={e.id}
            name='search'
            type='text'
            className='nav_inp'
            placeholder='search...'
            value={searchTerm}
            onChange={handleChange}
          /> :
          <NavLink className={({isActive}) => isActive ? 'nav_active_color' : ''} to={e.route} key={e.id}>{e.name}</NavLink> 
        )
      }
      {
        user &&
        <div className='nav_container'>
          <div onClick={() => setOpen(!open)} className="nav_container_frame">
            <p>{user.fullName.split(' ')[0]}</p>
            <i className={`fa-solid fa-angle-${open ? 'up' : 'down'}`}></i>
          </div>
          {
            open &&
            <div className='nav_options'>
              <button onClick={() => { navigate(ROUTES.PROFILE), setOpen(false) }} className='nav_option'>profile</button>
              <button onClick={() => { dispatch(logout()), setOpen(false), navigate(ROUTES.HOME) }} className='nav_option'>logout</button>
            </div>
          }
        </div> 
      }
    </nav>
  )
}

export default Navbar