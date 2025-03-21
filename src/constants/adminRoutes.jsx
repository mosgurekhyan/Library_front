import ROUTES from "../routes/routes"
import lazyLoad from "../utils/lazyLoad"

export const ADMIN_ROUTES = [
  { path: ROUTES.ADMIN, element: lazyLoad('../pages/admin/AdminDashboard/AdminDashboard') },
  { path: ROUTES.ADMIN_CATEGORY, element: lazyLoad('../pages/admin/AdminCategory/AdminCategory') },
  { path: ROUTES.ADMIN_SUB_CATEGORY, element: lazyLoad('../pages/admin/AdminSubCategory/AdminSubCategory') },
  { path: ROUTES.ADMIN_BOOKS, element: lazyLoad('../pages/admin/AdminBooks/AdminBooks') }
]