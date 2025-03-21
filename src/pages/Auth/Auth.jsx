import './Auth.css'

import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
import Verification from '../../components/Verification/Verification'
import { selectShowEmailInsertation, selectShowPasswordChanging, selectTemporaryEmail } from '../../store/slices/auth/authSlice'
import InsertEmail from '../../components/InsertEmail/InsertEmail'
import PasswordChanging from '../../components/PasswordChanging/PasswordChanging'

import { useState } from 'react'
import { useSelector } from 'react-redux'

function Auth() {
  const [ selection, setSelection ] = useState('login')
  const show = useSelector(selectTemporaryEmail)
  const showEmail = useSelector(selectShowEmailInsertation)
  const showPassword = useSelector(selectShowPasswordChanging)

  return (
    <div className='auth'>
      <img src="https://brandio.io/envato/iofrm/html/images/graphic2.svg" className="auth_img" />
      <div className="auth_container">
        <div className="auth_forms">
          <div className="auth_options">
            <p data-value='login' onClick={e => setSelection(e.target.dataset.value)} className={`auth_option ${selection === 'login' && 'auth_border'} ${selection === 'login' && 'auth_white_color'}`}>Մուտք</p>
            <p data-value='register' onClick={e => setSelection(e.target.dataset.value)} className={`auth_option ${selection === 'register' && 'auth_border'} ${selection === 'register' && 'auth_white_color'}`}>Գրանցվել</p>
          </div>
          { selection === 'login' ? <Login/> : <Register/> }
        </div>
      </div>
      { show && <Verification/> }
      { showEmail && <InsertEmail/> }
      { showPassword && <PasswordChanging/> }
    </div>
  )
}

export default Auth