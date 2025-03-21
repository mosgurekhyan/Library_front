const ADMIN_PREFIX = '/apanel/'

const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PROFILE: '/profile',
  ABOUT: '/about',
  CONTACT: '/contact',
  BOOKS: '/books',
  UNIQUE_BOOK: '/books/:id',  

  // Admin Routes
  ADMIN: '/apanel',
  ADMIN_CATEGORY: `${ADMIN_PREFIX}category`,
  ADMIN_SUB_CATEGORY: `${ADMIN_PREFIX}sub-category`,
  ADMIN_BOOKS: `${ADMIN_PREFIX}books`
}
  
export default ROUTES