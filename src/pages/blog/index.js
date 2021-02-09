import * as React from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import { BlogPostCard, Layout } from '@/components/index'
import { getBlogPosts } from '@/utils/get-blog-posts'
import { useRouter } from 'next/router'

const BlogIndex = ({ posts }) => {
  const { locale } = useRouter()
  const filteredPosts = posts.filter(post => post.lang === locale)
  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mt={8}>
        {filteredPosts.map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </SimpleGrid>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getBlogPosts()
  return {
    props: {
      posts,
    },
  }
}

export default BlogIndex
