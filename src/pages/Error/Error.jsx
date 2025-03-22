import './Error.css'

import ROUTES from "../../routes/routes"

import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Error() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === ROUTES.ADMIN) {
      window.location.reload()
    }
  }, [ pathname ])

  return (
    pathname !== ROUTES.ADMIN &&
    <div className="error-page">
      <h1 className="error_text">Error 404, Page not found</h1>
      <button onClick={() => navigate(ROUTES.HOME)}>Go to Home</button>
    </div>
  )
}

export default Error