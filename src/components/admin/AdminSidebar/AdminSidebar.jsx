import './AdminSidebar.css'

import { ADMIN_ITEMS } from '../../../constants/adminItems'
import { logout } from '../../../store/slices/auth/authSlice'
import ROUTES from '../../../routes/routes'

import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function AdminSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()  

  const handleLogout = () => {
    dispatch(logout()) 
    navigate(ROUTES.AUTH)  
  }

  return (
    <div className='admin_sidebar'>
      <button onClick={handleLogout} className='admin_sidebar_btn'>Logout</button>
      {
        ADMIN_ITEMS?.map(e => 
          <NavLink key={e.id} className={({isActive}) => isActive ? 'admin_sidebar_active_color' : 'admin_sidebar_a'} to={e.route} end>{e.name}</NavLink>
        )
      }
    </div>
  )
}

export default AdminSidebar