import './Contact.css'

import contact_us from '../../assets/images/contact_us.jpg'
import { sendMessage } from '../../store/slices/user/userAPI'

import { Formik } from "formik"
import * as Yup from 'yup'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Contact() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const validationSchema = Yup.object().shape({
    name: Yup.string()
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
    email: Yup.string().email('Խնդրում ենք լրացնել գործող էլեկտրոնային հասցե').required("դատարկ չի կարող լինել"),
    subject: Yup.string().required("դատարկ չի կարող լինել"),
    message: Yup.string().required("դատարկ չի կարող լինել")
  })

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        subject: '',
        message: ''
      }}

      onSubmit={(values, { resetForm }) => {
        dispatch(sendMessage({ values, resetForm }))
      }}

      validateOnBlur
      validationSchema={validationSchema}>

      {
        ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
          <div className='contact'>
            <img className='contact_img' src={contact_us} alt="" />            
            <form onSubmit={handleSubmit} className='contact_form'>
              <p className='contact_title'>Կապ մեզ հետ</p>
              <div className='contact_inp_container'>
                <input 
                  className="contact_inp"
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='name'
                  value={values.name}
                  placeholder='full name'
                  autoFocus
                />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className='contact_inp_container'>
                <input 
                  className="contact_inp"
                  type='text'
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='email'
                  value={values.email}
                  placeholder='email'
                />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className='contact_inp_container'>
                <input 
                  className="contact_inp"
                  type='text'
                  name='subject'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                  placeholder='subject'
                />
                {touched.subject && errors.subject && <p className="error">{errors.subject}</p>}
              </div>
              <div className='contact_inp_container contact_textarea_container'>
                <textarea 
                  className="contact_inp contact_textarea"
                  type='text'
                  name='message'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  placeholder='message'
                />
                {touched.message && errors.message && <p className="error">{errors.message}</p>}
              </div>
              <button disabled={!isValid && !dirty} type='submit' className='contact_btn'>Ուղարկել</button>
            </form>
          </div>
        )
      }
    </Formik>
  )
}

export default Contact