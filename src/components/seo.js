import { NextSeo } from 'next-seo'

import siteConfig from '@/configs/site-config'

export const Seo = ({ title, description }) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
)

export default Seo
