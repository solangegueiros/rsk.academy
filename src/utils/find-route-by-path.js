export const removeFromLast = (path, key) => {
  const index = path.lastIndexOf(key)
  return index === -1 ? path : path.substring(0, index)
}

export const findRouteByPath = (path, routes) => {
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, '.') === path) {
      return route
    }

    const childPath = route.routes && findRouteByPath(path, route.routes)

    if (childPath) {
      return childPath
    }
  }
  return null
}
