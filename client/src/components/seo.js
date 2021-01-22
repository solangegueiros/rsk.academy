import React from 'react'
import { NextSeo } from 'next-seo'

import siteConfig from '@/configs/site-config'

const Seo = ({ title, description }) => (
  <NextSeo
    title={title}
    description={description}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
)

export default Seo
