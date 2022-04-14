import {data} from './data.js'
import {Question} from '../models/Question.js'

export const question = data.map(question => new Question(question.question, question.choises,question.answer)) 

