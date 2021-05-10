import { CONTENT_PATH, loadMDXInfo } from '@utils/loadMdxInfo'

export const getMdxPaths = (): any[] => {
  const mdxPages = loadMDXInfo(CONTENT_PATH)

  return mdxPages.map(({ slug }) => {
    const slugArr = slug.split('/').filter(Boolean)

    const [course, module, url, lang] = slugArr

    return {
      params: {
        slug: [course, module, url],
      },
      locale: lang,
    }
  })
}
