import './AdminSubCategory.css'

import { selectCategories } from '../../../store/slices/category/categorySlice'
import { getCategories } from '../../../store/slices/category/categoryAPI'
import { createSubCategory, deleteSubCategory, getSubCategories, updateSubCategory } from '../../../store/slices/subcategory/subcategory.API'
import { selectSubCategories } from '../../../store/slices/subcategory/subcategorySlice'

import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect, useState } from 'react'
import { Formik } from "formik"
import * as Yup from 'yup'

function AdminSubCategory() {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const subcategories = useSelector(selectSubCategories)
  const [ categoryLoading, setCategoryLoading ] = useState(true)
  const [ subCategoryLoading, setSubCategoryLoading ] = useState(true)
  const [ err, setErr ] = useState(null)
  const [ selectedSubCategory, setSelectedSubCategory ] = useState(null)

  useLayoutEffect(() => {
    if (categories?.length === 0 && categoryLoading) {
      dispatch(getCategories())
      setCategoryLoading(false)
    }
  }, [ dispatch, categories, categoryLoading ])

  useLayoutEffect(() => {
    if (subcategories?.length === 0 && subCategoryLoading) {
      dispatch(getSubCategories())
      setSubCategoryLoading(false)
    }
  }, [ dispatch, subcategories, subCategoryLoading ])

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
    .max(20, 'անունը պետք է լինի ամենաշատը 20 նիշանոց'),
    categoryId: Yup.string().required("անհրաժեշտ է ընտրել կատեգորիան")
  })

  return (
    <div className='admin_page'>
      <p className="admin_page_title">Sub categories adding</p>
      <Formik
        initialValues={{
          name: '',
          categoryId: ''
        }}
  
        onSubmit={(values, { resetForm }) => {
          dispatch(createSubCategory({ values, resetForm, setErr }))
        }}
  
        validateOnBlur
        validationSchema={validationSchema}>
  
        {
          ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue}) => (
            <form onSubmit={handleSubmit} className='admin_form'>
              <div className='admin_sub_categories_container'>
                <div className="admin_categories">
                  {
                    categories?.map(e => 
                      <button onClick={() => setFieldValue('categoryId', e._id)} type='button' key={e._id} className={`admin_category ${values.categoryId === e._id && 'selected'}`}>{e.name}</button>
                    )
                  }
                </div>
                {touched.categoryId && errors.categoryId && <p className="error">{errors.categoryId}</p>}
              </div>
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
      <p className="admin_page_title">Sub categories</p>
      <div className="admin_categories">
        {
          subcategories?.map(e => 
            <div key={e._id} className="admin_elem_container">
              <p className={`admin_category ${selectedSubCategory?._id === e._id && 'selected'}`}>{e.name}</p>
              <div className="admin_btns">
                <button onClick={() => dispatch(deleteSubCategory(e._id))} className='admin_action_btn'>Delete</button>
                <button onClick={() => setSelectedSubCategory(e)} className='admin_action_btn'>Edit</button>
              </div>
            </div>
          )
        }
      </div>
      {
        selectedSubCategory &&
        <Formik
          initialValues={{
            name: selectedSubCategory ? selectedSubCategory.name : ''
          }}
    
          onSubmit={(values, { resetForm }) => {
            dispatch(updateSubCategory({ values, resetForm, setErr, setSelectedSubCategory, id: selectedSubCategory._id }))
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

export default AdminSubCategory