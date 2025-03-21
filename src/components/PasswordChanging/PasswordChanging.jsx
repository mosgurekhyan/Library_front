import './PasswordChanging.css'

import { changePassword } from '../../store/slices/auth/authAPI'

import { Formik } from "formik"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

function PasswordChanging() {
  const dispatch = useDispatch()
  const [ showPassword1, setShowPassword1 ] = useState(false)
  const [ showPassword2, setShowPassword2 ] = useState(false)

  const validationSchema = Yup.object().shape({
    password: Yup.string().typeError('must be a string').min(8, 'գաղտնաբառը պետք է ունենա գոնե 8 նիշ').max(20, 'գաղտնաբառը պետք է ունենա ամենաշատը 20 նիշ').required("դատարկ չի կարող լինել"),
    confirmPassword: Yup.string().typeError('must be a string').oneOf([Yup.ref('password')], "գաղտնաբառերը չեն համապատասխանում").required("դատարկ չի կարող լինել")
  })

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: ''
      }}

      onSubmit = {(values, { resetForm }) => {
        dispatch(changePassword(values.password))
        resetForm()
      }}
    
      validateOnBlur
      validationSchema={validationSchema}>

      {
        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
          <div className='password_changing'>
            <form className="password_changing_form" onSubmit={handleSubmit}>
              <h3 className="password-changing_title">Լրացրեք նոր գաղտնաբառը</h3>
              <div className='auth_inp_container'>  
                <figure className="password_wrapper">
                  <input 
                    className="auth_inp"
                    type={showPassword1 ? 'text' : 'password'}
                    name='password'
                    onChange={e => handleChange(e)}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder='password'
                  />
                  <i onClick={() => setShowPassword1(!showPassword1)} className={`eye fa-solid ${showPassword1 ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </figure>
                {touched.password && errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className='auth_inp_container'>  
                <figure className="password_wrapper">
                  <input 
                    className="auth_inp"
                    type={showPassword2 ? 'text' : 'password'}
                    name='confirmPassword'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder='confirm password'
                  />
                  <i onClick={() => setShowPassword2(!showPassword2)} className={`eye fa-solid ${showPassword2 ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </figure> 
                {touched.confirmPassword && errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
              <button className='auth_btn' disabled={!isValid && !dirty} type='submit'>Փոխել գատնաբառը</button>
            </form>
          </div>
        )
      }
    </Formik>
  )
}

export default PasswordChanging