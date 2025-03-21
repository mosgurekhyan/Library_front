import ROUTES from "../routes/routes"
import PageLoader from "../components/PageLoader/PageLoader"
import { currentUser } from "../store/slices/auth/authSlice"

import { Suspense, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ Component }) => {
  const user = useSelector(currentUser)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <PageLoader/>
  }

  return !user ? <Navigate to={ROUTES.AUTH} replace /> : 
  <Suspense fallback={<PageLoader/>}>
    <Component/>
  </Suspense>
}

export default ProtectedRoute