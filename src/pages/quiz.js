import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react'

import { Container, Layout, QuizList } from '@/components/all'

const QuizPage = () => {
  const bg = useColorModeValue('primary.500', 'light.500')
  const color = useColorModeValue('white', 'dark.500')

  return (
    <Layout>
      <Container maxW='3xl'>
        <Box>
          <Tabs isLazy isFitted>
            <TabList
              borderRadius='full'
              overflow='hidden'
              borderWidth={1}
              borderColor={bg}
            >
              <Tab _selected={{ color, bg }}>Dev Module 01</Tab>
              <Tab _selected={{ color, bg }}>Dev Module 02</Tab>
              <Tab _selected={{ color, bg }}>Dev Module 03</Tab>
            </TabList>

            <TabPanels mt={8}>
              <TabPanel>
                <QuizList course='dev' module='01' numberOfQuestions={6} />
              </TabPanel>
              <TabPanel>
                <QuizList course='dev' module='02' numberOfQuestions={10} />
              </TabPanel>
              <TabPanel>
                <QuizList course='dev' module='03' numberOfQuestions={8} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Layout>
  )
}

export default QuizPage
