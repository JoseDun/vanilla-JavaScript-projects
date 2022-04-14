export class UI {
  constructor() {}

  showQuestions(text) {
    const questionTitle = document.getElementById("question");
    questionTitle.innerText = text;
  }
  showChoices(choices, callback) {
    const choicesConatiner = document.getElementById("choises");
    choicesConatiner.innerHTML= ''

    choices.forEach((item) => {
      let button = document.createElement("button");
      button.innerText= item
      button.classList.add('button')
      button.addEventListener('click',()=> callback(item) )
  
      choicesConatiner.appendChild(button);

    });
  }
  showScore(score){
    const quizEndHtml = `
        <h1> Result </h1>
        <h2> Your Score is ${score}</h2>
    `
    const element = document.getElementById('quiz')
    element.innerHTML = quizEndHtml
  }
  showProgress(currentIndex,totalIndex){
      const element = document.getElementById('progress')
      element.innerHTML = `
      Question ${currentIndex} of ${totalIndex}
      `

  }
}
