import ProtectedRoute from "../hocs/ProtectedRoute"
import ROUTES from "../routes/routes"
import lazyLoad from "../utils/lazyLoad"

export const USER_ROUTES = [
  { path: ROUTES.HOME, element: lazyLoad('../pages/Home/Home') },
  { path: ROUTES.CONTACT, element: lazyLoad('../pages/Contact/Contact') },
  { path: ROUTES.BOOKS, element: lazyLoad('../pages/Books/Books') },
  { path: ROUTES.ABOUT, element: lazyLoad('../pages/About/About') },
  { path: ROUTES.UNIQUE_BOOK, element: lazyLoad('../pages/UniqueBook/UniqueBook') },
  { path: ROUTES.PROFILE, element: () => <ProtectedRoute Component={lazyLoad('../pages/Profile/Profile')} /> }
]