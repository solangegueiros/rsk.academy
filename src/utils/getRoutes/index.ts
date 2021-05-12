import devSidebar from '@configs/dev-sidebar.json'
import businessSidebar from '@configs/business-sidebar.json'
import { RouteType } from '@components'

export const getRoutes = (slug: string): RouteType[] => {
  const configMap = {
    dev: devSidebar,
    business: businessSidebar,
  }

  const config = Object.entries(configMap).find(([path]) => slug.startsWith(path))

  const sidebar = config && config[1]

  return sidebar?.routes ?? []
}
