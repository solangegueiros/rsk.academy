/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines-per-function */
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import Link from 'next/link'
import * as ComponentProps from '@chakra-ui/props-docs'
import { theme } from '@chakra-ui/react'

import { MdxComponents } from '@/components/all'

export function PropsTable({
  of,
  omit = [
    'isTruncated',
    'layerStyle',
    'noOfLines',
    'textStyle',
    'orientation',
    'styleConfig',
  ],
  only,
}) {
  const info = ComponentProps[of]
  if (!info || !info.props) {
    return null
  }

  const themeComponent = theme.components[of]
  const sizeValues = themeComponent?.sizes && Object.keys(themeComponent.sizes)
  const variantValues =
    themeComponent?.variants && Object.keys(themeComponent.variants)

  const extendThemeLink = (
    <Link
      href='/courses/theming/customize-theme#customizing-component-styles'
      passHref
    >
      <MdxComponents.a>extend the theme</MdxComponents.a>
    </Link>
  )

  /**
   * If component has size prop, override the rendered value
   * for `size` prop with the component's size values formatted as TS type.
   */
  if (info.props.size) {
    if (sizeValues) {
      info.props.size.type.name = sizeValues
        .map(size => `"${size}"`)
        .join(' | ')
    } else {
      info.props.size.description = (
        <>
          Sizes for {of} are not implemented in the default theme, but you can{' '}
          {extendThemeLink} to implement them.
        </>
      )
    }
  }

  /**
   * If component has variant prop, override the rendered value
   * for `variant` prop with the component's variant values formatted as TS type.
   */
  if (info.props.variant) {
    if (variantValues) {
      info.props.variant.type.name = variantValues
        .map(variant => `"${variant}"`)
        .join(' | ')
    } else {
      info.props.variant.description = (
        <>
          Variants for {of} are not implemented in the default theme, but you
          can {extendThemeLink} to implement them.
        </>
      )
    }
  }

  const defaultSize = themeComponent?.defaultProps?.size
  const defaultVariant = themeComponent?.defaultProps?.variant

  if (defaultSize != null) {
    info.props.size.defaultValue = {
      value: defaultSize,
    }
  }

  if (defaultVariant != null) {
    info.props.variant.defaultValue = {
      value: defaultVariant,
    }
  }

  const entries = useMemo(
    () =>
      Object.entries(info.props)
        .filter(([propName]) => {
          if (Array.isArray(only)) {
            return only.includes(propName)
          }
          if (Array.isArray(omit)) {
            return !omit.includes(propName)
          }
          return true
        })
        .sort(([a, aDef], [b, bDef]) => {
          const aRequired = aDef.required ? 1000 : 0
          const bRequired = bDef.required ? 1000 : 0
          const requiredOffset = aRequired - bRequired
          return String(a).localeCompare(b) - requiredOffset
        }),
    [info.props, omit, only],
  )

  if (!entries.length) {
    // this error breaks the build to notify you when there would be an empty table
    throw new Error(
      `No props left to render for component ${of}.
Remove the use of <PropsTable of="${of}" /> for this component in the docs.`,
    )
  }

  return (
    <MdxComponents.table>
      <thead>
        <tr>
          <MdxComponents.th>Name</MdxComponents.th>
          <MdxComponents.th>Type</MdxComponents.th>
          <MdxComponents.th>Description</MdxComponents.th>
          <MdxComponents.th>Default</MdxComponents.th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([propName, values]) => (
          <tr key={propName}>
            <MdxComponents.td>{propName}</MdxComponents.td>
            <MdxComponents.td>
              <MdxComponents.inlineCode
                whiteSpace='wrap'
                d='inline-block'
                lineHeight='tall'
              >
                {values.type?.name}
              </MdxComponents.inlineCode>
            </MdxComponents.td>
            <MdxComponents.td>{values.description}</MdxComponents.td>
            <MdxComponents.td>
              {values.defaultValue?.value ? (
                <MdxComponents.inlineCode
                  whiteSpace='wrap'
                  d='inline-block'
                  lineHeight='tall'
                >
                  {values.defaultValue.value}
                </MdxComponents.inlineCode>
              ) : (
                '-'
              )}
            </MdxComponents.td>
          </tr>
        ))}
      </tbody>
    </MdxComponents.table>
  )
}

PropsTable.propTypes = {
  omit: PropTypes.array,
  only: PropTypes.array,
  of: PropTypes.node,
}

export default PropsTable
