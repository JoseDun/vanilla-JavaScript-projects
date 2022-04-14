//@ts-check
import { question } from "./data/questions.js";
import { Quiz } from "./models/Quiz.js";
import { UI } from "./models/UI.js";

/**
 *
 * @param {Quiz} quiz the main quiz  object
 * @param {UI} ui ui object
 */
function renderPage(quiz, ui) {
  if (quiz.isEnded()) {
    console.log(quiz.score);
    ui.showScore(quiz.score)
  } else {
    ui.showQuestions(quiz.getQuestions().text);
    ui.showChoices(quiz.getQuestions().choises, (currentChoise) => {
      quiz.guess(currentChoise);
      renderPage(quiz, ui);
    });
    ui.showProgress(quiz.questionsIndex +1 , quiz.questions.length)
  }
}

function main() {
  const quiz = new Quiz(question);
  const ui = new UI();
  renderPage(quiz,ui)
}

main();
