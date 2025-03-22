import ROUTES from "./routes/routes"
import PageLoader from "./components/PageLoader/PageLoader"
import UserLayout from "./layouts/UserLayout"
import { USER_ROUTES } from "./constants/userRoutes"
import getRoutes from "./utils/getRoutes"
import { currentUser, logout, selectTokenError } from "./store/slices/auth/authSlice"
import AdminLayout from "./layouts/AdminLayout"
import { ADMIN_ROUTES } from "./constants/adminRoutes"
import { selectBooks } from "./store/slices/book/bookSlice"
import { getBooks } from "./store/slices/book/bookAPI"
import { refreshToken } from "./store/slices/auth/authAPI"

import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

const Error = lazy(() => import('./pages/Error/Error'))
const Auth = lazy(() => import('./pages/Auth/Auth'))

function App() {
  const dispatch = useDispatch()
  const user = useSelector(currentUser)
  const books = useSelector(selectBooks)
  const tokenError = useSelector(selectTokenError)
  const [ bookLoading, setBookLoading ] = useState(true)

  useLayoutEffect(() => {
    if (books?.length === 0 && bookLoading) {
      dispatch(getBooks())
      setBookLoading(false)
    }
  }, [ dispatch, books, bookLoading ])

  useEffect(() => {
    if (tokenError === 'AccessTokenRequired') {
      dispatch(refreshToken())
    } else if (tokenError === 'LogoutRequired') {
      dispatch(logout())
    } 
  }, [ tokenError, dispatch ])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {
          user?.role === import.meta.env.VITE_API_ADMIN_KEY &&
          <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
            {getRoutes(ADMIN_ROUTES)}
          </Route> 
        } 
        <Route path={ROUTES.HOME} element={<UserLayout />}>
          {getRoutes(USER_ROUTES)}
        </Route> 
        <Route path={ROUTES.AUTH} element={<Suspense fallback={<PageLoader />}><Auth /></Suspense>}/>
        <Route path='*' element={<Suspense fallback={<PageLoader/>}><Error/></Suspense>} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App