import Layout from '@/components/Layout'

import { QuizButton, Container } from '@/components/all'

const QuizPage = () => {
  return (
    <Layout>
      <Container>
        <QuizButton
          course='dev'
          module='01'
          title='Dev Module 1 Quiz'
          buttonText='Start Dev-1 Quiz'
        />
      </Container>
    </Layout>
  )
}

export default QuizPage
