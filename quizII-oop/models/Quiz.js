// @ts-check
import {Question}from './Question.js'

export class Quiz{
questionsIndex = 0
score =0
/**
 * 
 * @param {Question[]} questions  questions array
 */

constructor(questions){
    
    this.questions = questions
}
/**
 * 
 * @returns {Question} The questions found
 */

getQuestions(){
    return this.questions[this.questionsIndex]
}

/**
 * 
 * @param {string} answer some text
 */

guess(answer){
    if(this.getQuestions().correctAnswer(answer)){
        this.score++
    }
    this.questionsIndex++
}

/**
 * 
 * @returns {boolean} if the quetions goes on or not
 */

isEnded(){
    return this.questions.length === this.questionsIndex
}

}