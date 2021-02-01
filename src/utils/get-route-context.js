export const getAllRoutes = routes => {
  const allRoutes = []

  routes.forEach(module => {
    module.routes.forEach(route => {
      if (route.routes) {
        route.routes.forEach(item => {
          allRoutes.push(item)
        })
      } else {
        allRoutes.push(route)
      }
    })
  })

  return allRoutes
}
/**
 * Returns the siblings of a specific route (that is the previous and next routes).
 */
export const getRouteContext = (_route, routes) => {
  let ctx = {}
  if (!_route) return ctx

  const { path } = _route
  const allRoutes = getAllRoutes(routes)

  for (let i = 0; i < allRoutes.length; i += 1) {
    const route = allRoutes[i]

    if (route && route.path === `${path}`) {
      const nextRoute = allRoutes[i + 1]
      const prevRoute = allRoutes[i - 1]

      ctx = {
        nextRoute,
        prevRoute,
        route: _route,
      }
    }
  }

  return ctx
}
