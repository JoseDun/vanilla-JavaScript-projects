export class Question{

    /**
     * 
     * @param {string} text this is the text of the question
     * @param {string[]} choises this are the choises of the  question
     * @param {string} answer this is the answer of the question
     */

    constructor(text,choises,answer){
        this.text = text,
        this.choises = choises,
        this.answer= answer
    }
    /**
     * 
     * @param {string} choise some text to guess th answer
     * @returns {boolean} return true if the answuer is correct
     */
    correctAnswer(choise){
        return choise === this.answer
    }
}
