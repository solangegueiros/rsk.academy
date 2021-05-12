import { RouteType } from '@components'

export const getAllRoutes = (routes: RouteType[]): RouteType[] => {
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

type RouteContextType = (
  route: RouteType,
  routes: RouteType[],
) => {
  nextRoute: {
    title: { en: string; es: string; pt: string }
    path: string
  }
  prevRoute: {
    title: { en: string; es: string; pt: string }
    path: string
  }
  route: string
}

/**
 * Returns the siblings of a specific route (that is the previous and next routes).
 */
export const getRouteContext: RouteContextType = (_route, routes) => {
  let ctx = { nextRoute: null, prevRoute: null, route: null }
  if (!_route) return ctx

  const { path } = _route
  const allRoutes = getAllRoutes(routes)

  allRoutes.forEach((route, index: number) => {
    if (route && route.path === `${path}`) {
      const nextRoute = allRoutes[index + 1]
      const prevRoute = allRoutes[index - 1]

      ctx = {
        nextRoute,
        prevRoute,
        route: _route,
      }
    }
  })

  return ctx
}
