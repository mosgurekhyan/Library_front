import './BooksMenu.css'

import { selectCategoriesWithsubcategories } from '../../store/slices/category/categorySlice'
import { getCategoriesWithsubcategories } from '../../store/slices/category/categoryAPI'
import { setActiveName } from '../../store/slices/subcategory/subcategorySlice'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function BooksMenu() {
  const categories = useSelector(selectCategoriesWithsubcategories)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(true)
  const [ activeId, setActiveId ] = useState(null)

  useEffect(() => {
    if (categories?.length === 0 && loading) {
      dispatch(getCategoriesWithsubcategories())
      setLoading(false)
    }
  }, [ categories, dispatch, loading ])

  const toggleCategory = id => {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <div className='books_menu'>
      <p className="books_menu_title">Categories</p>
      <div className="books_menu_categories">
        {
          categories?.map(e => 
            <div key={e._id} className="books_menu_category">
              <div onClick={() => toggleCategory(e._id)} className="books_menu_category_wrapper">
                <p className="books_menu_category_name">{e.name}</p>
                <i className={`fa-solid fa-angle-${activeId === e._id ? 'up' : 'down'}`}></i>
              </div>
              {
                activeId === e._id &&
                e?.subcategories?.map(elem => 
                  <button onClick={() => dispatch(setActiveName(elem.name))} key={elem._id} className="books_menu_subcategory">{elem.name}</button>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default BooksMenu