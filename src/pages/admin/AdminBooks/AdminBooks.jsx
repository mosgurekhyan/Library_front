import './AdminBooks.css'

import { selectSubCategories } from '../../../store/slices/subcategory/subcategorySlice'
import { selectCategories } from '../../../store/slices/category/categorySlice'
import { getCategories } from '../../../store/slices/category/categoryAPI'
import { getSubCategories } from '../../../store/slices/subcategory/subcategory.API'
import { createBook, deleteBook, getBooks, updateBook } from '../../../store/slices/book/bookAPI'
import { selectBooks } from '../../../store/slices/book/bookSlice'
import { fileInstance } from '../../../api/file'

import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect, useRef, useState } from 'react'
import { Formik } from "formik"
import * as Yup from 'yup'

function AdminBooks() {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const subcategories = useSelector(selectSubCategories)
  const books = useSelector(selectBooks)
  const [ bookLoading, setBookLoading ] = useState(true)
  const [ categoryLoading, setCategoryLoading ] = useState(true)
  const [ subCategoryLoading, setSubCategoryLoading ] = useState(true)
  const [ selectedBook, setSelectedBook ] = useState(null)
  const imgRef = useRef(null)
  const fileRef = useRef(null)

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

  useLayoutEffect(() => {
    if (books?.length === 0 && bookLoading) {
      dispatch(getBooks())
      setBookLoading(false)
    }
  }, [ dispatch, books, bookLoading ])

  const validationSchema = isEditMode => {
    return Yup.object().shape({
    type: Yup.string().required('тип обязателен'),
    name: Yup.string().typeError('must be a string').required("դատարկ չի կարող լինել"),
    category: Yup.string().required("անհրաժեշտ է ընտրել կատեգորիան"),
    isbn: Yup.string().required("դատարկ չի կարող լինել"),
    author: Yup.string().required("դատարկ չի կարող լինել"),
    date: Yup.string().required("դատարկ չի կարող լինել"),
    pages: Yup.number().required("դատարկ չի կարող լինել").positive('pages must be a positive number').integer('pages must be an integer'),
    subcategory: Yup.string().required("անհրաժեշտ է ընտրել sub category"),
    description: Yup.string().required("դատարկ չի կարող լինել"),
    img: isEditMode ? Yup.mixed().nullable() : Yup.mixed().required('изображение обязательно'),
    quantity: Yup.number()
    .typeError('количество должно быть числом')
    .when('type', {
      is: 'физическая',
      then: schema => schema.required('количество обязательно для физического типа').positive('количество должно быть положительным').integer('количество должно быть целым числом'),
      otherwise: schema => schema.notRequired()
    }),
    file: isEditMode ? Yup.mixed().nullable() : Yup.mixed()
    .when('type', {
      is: 'электронная',
      then: schema => schema.required('файл обязателен для электронного типа'),
      otherwise: schema => schema.notRequired()
    })
  })}

  return (
    <div className='admin_page'>
      <p className="admin_page_title">Books adding</p>
      <Formik
        initialValues={{
          type: '',
          category: '',
          subcategory: '',
          name: '', 
          author: '',
          isbn: '',
          date: '',
          pages: '',
          description: '',
          quantity: '',
          img: null,
          file: null,
          subcategoryId: ''       
        }}
  
        onSubmit={(values, { resetForm }) => {
          let data = { ...values }

          if (values.type === 'физическая') {
            delete data.file
          }

          if (values.type === 'электронная') {
            data.quantity = 1
          }

          dispatch(createBook({ data, resetForm, imgRef, fileRef }))
        }}
  
        validateOnBlur
        validationSchema={validationSchema(false)}>
  
        {
          ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue}) => (
            <form onSubmit={handleSubmit} className='admin_form'>
              <div className='admin_sub_categories_container'>
                <div className="admin_books_categories">
                  <button onClick={() => setFieldValue("type", "электронная")} type='button' className={`admin_books_category ${values.type === "электронная" && "selected"}`} >электронная</button>
                  <button onClick={() => setFieldValue("type", "физическая")} type='button' className={`admin_books_category ${values.type === "физическая" && "selected"}`} >физическая</button>
                </div>
                {touched.type && errors.type && <p className="error">{errors.type}</p>}
              </div>
              <div className='admin_sub_categories_container'>
                <p className="admin_section_name">select category</p>
                <div className="admin_books_categories">
                  {
                    categories?.map(e => 
                      <button onClick={() => setFieldValue('category', e.name)} key={e._id} className={`admin_books_category ${values.category === e.name && 'selected'}`} type='button'>{e.name}</button>
                    )
                  }
                </div>
                {touched.category && errors.category && <p className="error">{errors.category}</p>}
              </div>
              <div className='admin_sub_categories_container'>
                <p className="admin_section_name">select sub category</p>
                <div className="admin_books_categories">
                  {
                    subcategories?.map(e => 
                      <button onClick={() => { setFieldValue('subcategory', e.name), setFieldValue('subcategoryId', e._id )}} key={e._id} className={`admin_books_category ${values.subcategory === e.name && 'selected'}`} type='button'>{e.name}</button>
                    )
                  }
                </div>
                {touched.subcategory && errors.subcategory && <p className="error">{errors.subcategory}</p>}
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
                />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className='admin_inp_container'>
                <input 
                  className="admin_inp"
                  type='text'
                  name='author'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='author'
                  value={values.author}
                  placeholder='author'
                />
                {touched.author && errors.author && <p className="error">{errors.author}</p>}
              </div>
              <div className='admin_inp_container'>
                <input 
                  className="admin_inp"
                  type='text'
                  name='isbn'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='isbn'
                  value={values.isbn}
                  placeholder='ISBN'
                />
                {touched.isbn && errors.isbn && <p className="error">{errors.isbn}</p>}
              </div>
              <div className='admin_inp_container'>
                <input 
                  className="admin_inp"
                  type='text'
                  name='date'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='date'
                  value={values.date}
                  placeholder='date'
                />
                {touched.date && errors.date && <p className="error">{errors.date}</p>}
              </div>
              <div className='admin_inp_container'>
                <input 
                  className="admin_inp"
                  type='number'
                  name='pages'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='pages'
                  value={values.pages}
                  placeholder='pages'
                />
                {touched.pages && errors.pages && <p className="error">{errors.pages}</p>}
              </div>
              <div className='admin_inp_container'>
                <input 
                  className="admin_inp"
                  type='text'
                  name='description'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='description'
                  value={values.description}
                  placeholder='description'
                />
                {touched.description && errors.description && <p className="error">{errors.description}</p>}
              </div>
              <div className='admin_inp_container'>
                <p className='admin_file_text' onClick={() => imgRef.current.click()}>{imgRef?.current?.value ? 'image selected' : 'select image'}</p>
                <input 
                  onChange={e => {
                    const file = e.target.files[0]
                    setFieldValue('img', file)
                  }}
                  ref={imgRef}
                  accept="image/*"
                  className="admin_inp display_none"
                  type='file'
                  name='img'
                />
                {touched.img && errors.img && <p className="error">{errors.img}</p>}
              </div>
              {
                values.type === 'физическая' &&
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='number'
                    name='quantity'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='quantity'
                    value={values.quantity}
                    placeholder='quantity'
                  />
                  {touched.quantity && errors.quantity && <p className="error">{errors.quantity}</p>}
                </div>
              }
              {
                values.type === 'электронная' &&
                <div className='admin_inp_container'>
                  <p className='admin_file_text' onClick={() => fileRef.current.click()}>{fileRef?.current?.value ? 'file selected' : 'select file'}</p>
                  <input 
                    onChange={e => {
                      const file = e.target.files[0]
                      setFieldValue('file', file)
                    }}
                    ref={fileRef}
                    className="admin_inp display_none"
                    type='file'
                    name='file'
                  />
                  {touched.file && errors.file && <p className="error">{errors.file}</p>}
                </div>
              }
              <button disabled={!isValid && !dirty} type='submit' className='admin_btn'>add</button>
            </form>
          )
        }
      </Formik>
      <p className="admin_page_title">Books</p>
      <div className="admin_books">
        {
          books?.map(e => 
            <div key={e._id} className="admin_elem_container">
              <img src={`${fileInstance}${e.img}`} alt="" className="admin_img" />
              <p className="admin_books_author">{e.author}</p>
              <p className="admin_books_name">{e.name}</p>
              <div className="admin_btns">
                <button onClick={() => dispatch(deleteBook(e._id))} className='admin_action_btn'>Delete</button>
                <button onClick={() => setSelectedBook(e)} className='admin_action_btn'>Edit</button>
              </div>
            </div>
          )
        }
      </div>
      {
        selectedBook &&
        <Formik
          initialValues={{
            type: selectedBook ? selectedBook.type : '',
            name: selectedBook ? selectedBook.name : '',
            author: selectedBook ? selectedBook.author : '',
            isbn: selectedBook ? selectedBook.isbn : '',
            date: selectedBook ? selectedBook.date : '',
            pages: selectedBook ? selectedBook.pages : '',
            description: selectedBook ? selectedBook.description : '',
            quantity: selectedBook ? selectedBook.quantity : '',
            img: selectedBook ? selectedBook.img : null,
            file: selectedBook ? selectedBook.file : null         
          }}
    
          onSubmit={(values, { resetForm }) => {
            let data = { ...values }

            if (values.type === 'физическая') {
              delete data.file
            }

            if (values.type === 'электронная') {
              delete data.quantity
            }
            dispatch(updateBook({ data, resetForm, setSelectedBook, id: selectedBook?._id, imgRef, fileRef }))
          }}
    
          validateOnBlur
          enableReinitialize={true}
          validationSchema={validationSchema(true)}>
    
          {
            ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue}) => (
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
                  />
                  {touched.name && errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='text'
                    name='author'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='author'
                    value={values.author}
                    placeholder='author'
                  />
                  {touched.author && errors.author && <p className="error">{errors.author}</p>}
                </div>
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='text'
                    name='isbn'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='isbn'
                    value={values.isbn}
                    placeholder='ISBN'
                  />
                  {touched.isbn && errors.isbn && <p className="error">{errors.isbn}</p>}
                </div>
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='text'
                    name='date'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='date'
                    value={values.date}
                    placeholder='date'
                  />
                  {touched.date && errors.date && <p className="error">{errors.date}</p>}
                </div>
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='number'
                    name='pages'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='pages'
                    value={values.pages}
                    placeholder='pages'
                  />
                  {touched.pages && errors.pages && <p className="error">{errors.pages}</p>}
                </div>
                <div className='admin_inp_container'>
                  <input 
                    className="admin_inp"
                    type='text'
                    name='description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='description'
                    value={values.description}
                    placeholder='description'
                  />
                  {touched.description && errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div className='admin_inp_container'>
                  <p className='admin_file_text' onClick={() => imgRef.current.click()}>{imgRef?.current?.value ? 'image selected' : 'select image'}</p>
                  <input 
                    onChange={e => {
                      const file = e.target.files[0]
                      setFieldValue('img', file)
                    }}
                    ref={imgRef}
                    accept="image/*"
                    className="admin_inp display_none"
                    type='file'
                    name='img'
                  />
                  {touched.img && errors.img && <p className="error">{errors.img}</p>}
                </div>
                {
                  values.type === 'физическая' &&
                  <div className='admin_inp_container'>
                    <input 
                      className="admin_inp"
                      type='number'
                      name='quantity'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete='quantity'
                      value={values.quantity}
                      placeholder='quantity'
                    />
                    {touched.quantity && errors.quantity && <p className="error">{errors.quantity}</p>}
                  </div>
                }
                {
                  values.type === 'электронная' &&
                  <div className='admin_inp_container'>
                    <p className='admin_file_text' onClick={() => fileRef.current.click()}>{fileRef?.current?.value ? 'file selected' : 'select file'}</p>
                    <input 
                      onChange={e => {
                        const file = e.target.files[0]
                        setFieldValue('file', file)
                      }}
                      ref={fileRef}
                      className="admin_inp display_none"
                      type='file'
                      name='file'
                    />
                    {touched.file && errors.file && <p className="error">{errors.file}</p>}
                  </div>
                }
                <button disabled={!isValid && !dirty} type='submit' className='admin_btn'>edit</button>
              </form>
            )
          }
        </Formik>
      }
    </div>
  )
}

export default AdminBooks