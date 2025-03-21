import './InsertEmail.css'

import { setShowEmailInsertation } from '../../store/slices/auth/authSlice'
import { sendEmail } from '../../store/slices/auth/authAPI'

import { useDispatch } from 'react-redux'
import { Formik } from "formik"
import * as Yup from 'yup'

function InsertEmail() {
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('խնդրում ենք լրացրեք վավեր էլեկտրոնային հասցե').required("դատարկ չի կարող լինել")
  })

  return (
    <Formik
      initialValues={{
        email: ''
      }}

      onSubmit={(values, { resetForm }) => {
        dispatch(sendEmail(values.email))
        resetForm()
      }}

      validateOnBlur
      validationSchema={validationSchema}>

      {
        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
          <div className='insert_email'>
            <form onSubmit={handleSubmit} className='insert_email_form'>
              <h2 className='insert_email_title'>Նոր գաղտնաբառ 🔒️</h2>
              <p className='insert_email_description'>Լրացրեք ձեր էլեկտրոնային հասցեն գաղտնաբառը վերականգնելու համար</p>
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
              <div className="insert_email_wrapper">
                <button className='insert_email_btn insert_email_btn1' onClick={() => dispatch(setShowEmailInsertation(false))} type='button'>Հետ</button>
                <button disabled={!isValid && !dirty} className='insert_email_btn insert_email_btn2' type='submit'>Send OTP</button>
              </div>
            </form>
          </div>
        )
      }
    </Formik>
  )
}

export default InsertEmail