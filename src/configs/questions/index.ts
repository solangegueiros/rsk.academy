import { CourseType, ModuleType, QuestionType } from '@store/quiz/slice'

import devModule01MC from './dev/01/mc.json'
import devModule01TF from './dev/01/tf.json'
import devModule02MC from './dev/02/mc.json'
import devModule02TF from './dev/02/tf.json'
import devModule03MC from './dev/03/mc.json'
import devModule03TF from './dev/03/tf.json'

export const questions: Record<CourseType, Record<ModuleType, QuestionType[]>> = {
  dev: {
    '01': [...devModule01TF, ...devModule01MC],
    '02': [...devModule02TF, ...devModule02MC],
    '03': [...devModule03TF, ...devModule03MC],
  },
  business: {
    '01': [],
    '02': [],
    '03': [],
  },
}
