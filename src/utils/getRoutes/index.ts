import { RouteType } from '@components'
import businessSidebar from '@configs/business-sidebar.json'
import devSidebar from '@configs/dev-sidebar.json'

export const getRoutes = (slug: string): RouteType[] => {
  const configMap = {
    dev: devSidebar,
    business: businessSidebar,
  }

  const config = Object.entries(configMap).find(([path]) => slug.startsWith(path))

  const sidebar = config && config[1]

  return sidebar?.routes ?? []
}
