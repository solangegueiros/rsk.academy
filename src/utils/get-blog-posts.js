import { loadMDXFromPages } from '@/utils/load-mdx-dir'

export const getBlogPosts = async () => {
  const mdxData = await loadMDXFromPages('blog')
  return mdxData
    .map(blogPostData => ({
      ...blogPostData,
      slug: blogPostData.slug.replace(/\/index$/, ''), // fix url
      author: blogPostData.author ?? null, // `undefined` cannot be serialized as JSON
      date: new Date(blogPostData.date).toISOString(),
      tags: Array.isArray(blogPostData.tags) ? blogPostData.tags : [],
    }))
    .sort(byDateDesc)
}

function byDateDesc(aPost, bPost) {
  const aPostTime = new Date(aPost.date).getTime()
  const bPostTime = new Date(bPost.date).getTime()

  return bPostTime - aPostTime
}
