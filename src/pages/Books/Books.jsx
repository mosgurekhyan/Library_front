import './Books.css'

import BooksMenu from '../../components/BooksMenu/BooksMenu'
import BooksContent from '../../components/BooksContent/BooksContent'

function Books() {
  return (
    <div className='books'>
      <BooksMenu/>
      <BooksContent/>
    </div>
  )
}

export default Books