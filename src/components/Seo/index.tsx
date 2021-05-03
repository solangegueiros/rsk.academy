import { NextSeo } from 'next-seo'

import siteConfig from '@configs/site-config'

interface SeoProps {
  title: string
  description: string
}

export const Seo = ({ title, description }: SeoProps): JSX.Element => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
)
