import './AdminCategory.css'

import { createCategory, getCategories, deleteCategory, updateCategory } from '../../../store/slices/category/categoryAPI'
import { selectCategories } from '../../../store/slices/category/categorySlice'

import { Formik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect, useState } from 'react'

function AdminCategory() {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const [ err, setErr ] = useState(null)
  const [ selectedCategory, setSelectedCategory ] = useState(null)
  const [ categoryLoading, setCategoryLoading ] = useState(true)

  useLayoutEffect(() => {
    if (categories?.length === 0 && categoryLoading) {
      dispatch(getCategories())
      setCategoryLoading(false)
    }
  }, [ dispatch, categories, categoryLoading ])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .typeError('must be a string')
    .required("դատարկ չի կարող լինել")
    .test(
      'one-word',
      'must consist of only one word',
      value => {
        if (!value) return false
        return !value.includes(' ')
      }
    )
    .max(20, 'անունը պետք է լինի ամենաշատը 20 նիշանոց')
  })

  return (
    <div className='admin_page'>
      <p className="admin_page_title">Categories adding</p>
      <Formik
        initialValues={{
          name: ''
        }}
  
        onSubmit={(values, { resetForm }) => {
          dispatch(createCategory({ values, resetForm, setErr }))
        }}
  
        validateOnBlur
        validationSchema={validationSchema}>
  
        {
          ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
            <form onSubmit={handleSubmit} className='admin_form'>
              <div className='admin_inp_container'>
                <input 
                  className="admin_inp"
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='name'
                  value={values.name}
                  placeholder='name'
                  autoFocus
                />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                {err && <p className="error">{err}</p>}
              </div>
              <button disabled={!isValid && !dirty} type='submit' className='admin_btn'>add</button>
            </form>
          )
        }
      </Formik>
      <p className="admin_page_title">Categories</p>
      <div className="admin_categories">
        {
          categories?.map(e => 
            <div key={e._id} className="admin_elem_container">
              <p className={`admin_category ${selectedCategory?._id === e._id && 'selected'}`}>{e.name}</p>
              <div className="admin_btns">
                <button onClick={() => dispatch(deleteCategory(e._id))} className='admin_action_btn'>Delete</button>
                <button onClick={() => setSelectedCategory(e)} className='admin_action_btn'>Edit</button>
              </div>
            </div>
          )
        }
      </div>
      {
        selectedCategory &&
        <Formik
          initialValues={{
            name: selectedCategory ? selectedCategory?.name : ''
          }}
    
          onSubmit={(values, { resetForm }) => {
            dispatch(updateCategory({ values, resetForm, setErr, setSelectedCategory, id: selectedCategory._id }))
          }}
    
          validateOnBlur
          enableReinitialize={true}
          validationSchema={validationSchema}>
    
          {
            ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
              <form onSubmit={handleSubmit} className='admin_form'>
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='text'
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='name'
                    value={values.name}
                    placeholder='name'
                    autoFocus
                  />
                  {touched.name && errors.name && <p className="error">{errors.name}</p>}
                  {err && <p className="error">{err}</p>}
                </div>
                <button disabled={!isValid && !dirty} type='submit' className='admin_btn'>edit</button>
              </form>
            )
          }
        </Formik>
      }
    </div>
  )
}

export default AdminCategory