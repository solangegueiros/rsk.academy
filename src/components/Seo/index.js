import PropTypes from 'prop-types'
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

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default Seo
