import './Register.css'

import { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/slices/auth/authAPI'

function Register() {
  const dispatch = useDispatch()
  const [ showPassword1, setShowPassword1 ] = useState(false)
  const [ showPassword2, setShowPassword2 ] = useState(false)
  const [ err, setErr ] = useState(null)

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
    .typeError('must be a string')
    .required("դատարկ չի կարող լինել")
    .test(
      'two-words',
      'must contain exactly two words',
      value => {
        if (!value) return false
        const words = value.trim().split(' ')
        return words.length === 2
      }
    )
    .max(30, 'անունը պետք է լինի ամենաշատը 30 նիշանոց'),
    email: Yup.string().email('խնդրում ենք նշել գործող էլեկտրոնային հասցե').required("դատարկ չի կարող լինել"),
    role: Yup.string().required("նշեք ձեր կարգավիճակը"),
    profession: Yup.string().required("նշեք ձեր profession-ը"),
    educationalInstitution: Yup.string().required("նշեք ձեր profession-ը"),
    password: Yup.string().typeError('must be a string').min(8, 'գաղտնաբառը պետք է պարունակի ամենաքիչը 8 նիշ').max(20, 'Գաղտնաբառը պետք է պարունակի ամենաշատը 20 նիշ').required("դատարկ չի կարող լինել"),
    confirmPassword: Yup.string().typeError('must be a string').oneOf([Yup.ref('password')], "գաղտնաբառերը չեն համընկնում").required("դատարկ չի կարող լինել")
  })

  return (
    <Formik
      initialValues = {{
        fullName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        profession: '',
        educationalInstitution: ''
      }}
      onSubmit = {( values, { resetForm } ) => {
        dispatch(createUser({ values, resetForm, setErr }))
      }}
      
      validateOnBlur
      validationSchema = { validationSchema }
      >

      {
        ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue }) => (
          <form className='auth_form' onSubmit={handleSubmit}>
            <div className='auth_inp_container'>
              <input 
                className="auth_inp"
                type='text'
                name='fullName'
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='name'
                value={values.fullName}
                placeholder='full name'
                autoFocus
              />
              {touched.fullName && errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className='auth_inp_container'>    
              <input 
                type='text'
                className="auth_inp"
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='email'
                value={values.email}
                placeholder='email'
              />
              {touched.email && errors.email && <p className="error">{errors.email}</p>}
              {err && <p className="error">{err}</p>}
            </div>
            <div className="auth_inp_container">
              <div className="auth_roles">
                <button onClick={() => setFieldValue("role", "студент")} type='button' className={`auth_role_btn ${values.role === "студент" && "active_auth_active_role_btn"}`}>студент</button>
                <button onClick={() => setFieldValue("role", "лектор")} type='button' className={`auth_role_btn ${values.role === "лектор" && "active_auth_active_role_btn"}`}>лектор</button>
              </div>
              {touched.role && errors.role && <p className="error">{errors.role}</p>}
            </div>
            <div className='auth_inp_container'>    
              <input 
                type='text'
                className="auth_inp"
                name='profession'
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='profession'
                value={values.profession}
                placeholder='profession'
              />
              {touched.profession && errors.profession && <p className="error">{errors.profession}</p>}
            </div>
            <div className="auth_inp_container">
              <div className="auth_roles">
                <button onClick={() => setFieldValue("educationalInstitution", "колледж")} type='button' className={`auth_role_btn ${values.educationalInstitution === "колледж" && "active_auth_active_role_btn"}`}>колледж</button>
                <button onClick={() => setFieldValue("educationalInstitution", "университет")} type='button' className={`auth_role_btn ${values.educationalInstitution === "университет" && "active_auth_active_role_btn"}`}>университет</button>
              </div>
              {touched.educationalInstitution && errors.educationalInstitution && <p className="error">{errors.educationalInstitution}</p>}
            </div>
            <div className='auth_inp_container'>  
              <figure className="password_wrapper">
                <input 
                  className="auth_inp"
                  type={showPassword1 ? 'text' : 'password'}
                  name='password'
                  onChange={e => handleChange(e)}
                  // onChange={(e) => {handleChange(e); getPasswordStrength(e.target.value)}}
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
            <button type='submit' disabled={!isValid && !dirty} className='auth_btn'>Գրանցվել</button>
          </form>
        )
      }
    </Formik>
  )
}

export default Register