const quizData = [
  {
    question: "How much is 5 * 5?",
    a: "10",
    b: "17",
    c: "25",
    d: "110",
    correct: "c",
  },
  {
    question: "What is the most used programming language in 2017",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Who is the President of US in 2018?",
    a: "iker casillas",
    b: "Donald Trump",
    c: "Rick Curt",
    d: "Jack Willians",
    correct: "b",
  },
  {
    question: "How much is 10 * 5?",
    a: "50",
    b: "500",
    c: "45",
    d: "non of the above",
    correct: "a",
  },
];
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const btn = document.getElementById("btn");
const scoreEl = document.querySelector('.score')
const quizContainer = document.querySelector('.quiz-container')
   

let currentQuiz = 0;
let score = 0;
loadQuiz();
function loadQuiz() {
  deselected()
  const currentQuizData = quizData[currentQuiz];

  questionEl.textContent = currentQuizData.question;
  a_text.textContent = currentQuizData.a;
  b_text.textContent = currentQuizData.b;
  c_text.textContent = currentQuizData.c;
  d_text.textContent = currentQuizData.d;
}

function getSeleted() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}
function deselected(){
 answerEls.forEach(element => {
  element.checked = false
 });  
}

btn.addEventListener("click", () => {
  const answer = getSeleted();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
      console.log(score);
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } 
    else {
      quizContainer.classList.toggle('move')
      scoreEl.innerHTML = `<h2 class='call'> You answered correctly at ${score} / ${quizData.length} question </h2>
      
      <button onclick="location.reload()" >Start Over</button>
      `
    }
   
  }
});
