import PageLoader from "../components/PageLoader/PageLoader"

import { Suspense } from "react"
import { Route } from "react-router-dom"

const getRoutes = routes => 
  // eslint-disable-next-line no-unused-vars
  routes.map(({ path, element: Component }) => (
    <Route
      key={path}
      path={path}
      element={
        <Suspense fallback={<PageLoader/>}>
          <Component/>
        </Suspense>
      }
    />
  )
)

export default getRoutes