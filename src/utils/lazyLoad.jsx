import { lazy } from "react"

const lazyLoad = path => lazy(() => import(/* @vite-ignore */path))

export default lazyLoad