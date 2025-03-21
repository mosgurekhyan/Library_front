import PageLoader from "../components/PageLoader/PageLoader"

import { useEffect, useState } from "react"

const PrivateRoute = ({ children }) => {
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <PageLoader/>
  }

  return children
}

export default PrivateRoute