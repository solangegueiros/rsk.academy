import { RouteType } from '@components'

export const removeFromLast = (path: string, key: string): string => {
  const index = path.lastIndexOf(key)
  return index === -1 ? path : path.substring(0, index)
}

export const findRouteByPath = (path: string, routes: RouteType[], key = '.'): RouteType => {
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, key) === path) {
      return route
    }

    const childPath = route.routes && findRouteByPath(path, route.routes)

    if (childPath) {
      return childPath
    }
  }
  return null
}
