import './Login.css'

import { Formik } from "formik"
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, sendEmail } from '../../store/slices/auth/authAPI'
import { setShowEmailInsertation } from '../../store/slices/auth/authSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ showPassword, setShowPassword ] = useState(false)
  const [ err, setErr ] = useState(null)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('խնդրում ենք լրացրեք վավեր էլեկտրոնային հասցե').required("դատարկ չի կարող լինել"),
    password: Yup.string().required("դատարկ չի կարող լինել")
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}

      onSubmit={(values, { resetForm }) => {
        dispatch(loginUser({ values, navigate, resetForm, setErr}))
      }}

      validateOnBlur
      validationSchema={validationSchema}>

      {
        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
          <form className="auth_form" onSubmit={handleSubmit}>
            <div className='auth_inp_container'>    
              <input 
                className="auth_inp" 
                type='text'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='email'
                autoComplete="email"
                autoFocus
              />
              {touched.email && errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className='auth_inp_container'>    
              <figure className="password_wrapper">
                <input 
                className="auth_inp" 
                type={showPassword ? 'text' : 'password'}
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='password'
                autoComplete="current-password"
                />
                <i onClick={() => setShowPassword(!showPassword)} className={`eye fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </figure>
              {touched.password && errors.password && <p className="error">{errors.password}</p>}
              {err && <p className="error">{err}</p>}
            </div>
            <button onClick={() => dispatch(sendEmail(values.email))} type="button" className={`auth_confirm_btn ${err === 'please verify email' && 'visibility'}`}>Confirm</button> 
            <div className="auth_btns">
              <button type='submit' disabled={!isValid && !dirty} className='auth_btn'>Մուտք</button>
              <button onClick={() => dispatch(setShowEmailInsertation(true))} type='button' className='auth_forget'>Մոռացել եք գաղտնաբառը?</button>
            </div>
          </form>
        )
      }
    </Formik>
  )
}

export default Login