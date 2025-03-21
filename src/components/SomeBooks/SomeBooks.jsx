import './SomeBooks.css'

import { selectActiveSubcategory, selectSubCategoriesWithbooks, setActiveSubcategory } from '../../store/slices/subcategory/subcategorySlice'
import { getSubCategoriesWithbooks } from '../../store/slices/subcategory/subcategory.API'
import { fileInstance } from '../../api/file'
import ROUTES from '../../routes/routes'

import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SomeBooks() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ subCategoriesLoading, setSubCategoriesLoading ] = useState(true)
  const subcategories = useSelector(selectSubCategoriesWithbooks)
  const activeItem = useSelector(selectActiveSubcategory)

  useLayoutEffect(() => {
    if (subcategories?.length === 0 && subCategoriesLoading) {
      dispatch(getSubCategoriesWithbooks())
      setSubCategoriesLoading(false)
    }
  }, [ dispatch, subcategories, subCategoriesLoading ])

  useEffect(() => {
    if (subcategories?.length > 0) {
      dispatch(setActiveSubcategory(subcategories[0]))
    }
  }, [ subcategories, dispatch ])

  return (
    <div className='somebooks'>
      <div className="somebooks_menu">
        {
          subcategories?.map(e => 
            <div onClick={() => dispatch(setActiveSubcategory(e))} key={e._id} className="somebooks_menu_item">
              <p className="somebooks_menu_item_name">{e.name}</p>
              {activeItem?._id === e._id && <span className="somebooks_menu_item_line"></span>}
            </div>
          )
        }
      </div>
      <div className="somebooks_container">
        {
          activeItem?.books?.map(e => 
            <div onClick={() => navigate(`${ROUTES.BOOKS}/${e._id}`)} key={e._id} className="somebooks_active_book">
              <img src={`${fileInstance}${e.img}`} alt="" className="somebooks_active_book_img" />
              <p className="somebooks_active_book_author">{e.author}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SomeBooks