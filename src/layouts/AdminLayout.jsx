import AdminSidebar from "../components/admin/AdminSidebar/AdminSidebar"

import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <div className="admin_layout">
      <AdminSidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout