import './Error.css'

import ROUTES from "../../routes/routes"
import PageLoader from '../../components/PageLoader/PageLoader'

import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Error() {
  const navigate = useNavigate()
  const [ wait, setWait ] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    setTimeout(() => {
      if (pathname === ROUTES.ADMIN) {
        window.location.reload()
      }
      setWait(false)
    }, 1000)
  }, [ pathname ])

  return (
    <>
      {
        wait ? <PageLoader/> :
        <div className="error-page">
          <h1 className="error_text">Error 404, Page not found</h1>
          <button onClick={() => navigate(ROUTES.HOME)}>Go to Home</button>
        </div>
      }
    </>
  )
}

export default Error
