// Questions Array
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: 2
  },
  {
    question: "Which is used for Connect To Database?",
    options: ["PHP", "HTML", "JS", "All"],
    answer: 0
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["C++", "Python", "HTML", "Java"],
    answer: 2
  }
];

// Selecting Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const scoreText = document.getElementById("score-text");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Start Quiz
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
});

// Load Question Function
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.question;

  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li, index));
    optionsList.appendChild(li);
  });

  nextBtn.disabled = true;
}

// Select Option Function
function selectOption(selectedLi, selectedIndex) {
  const allOptions = optionsList.querySelectorAll("li");
  allOptions.forEach(option => option.classList.remove("selected")); // sab options se blue hatado
  selectedLi.classList.add("selected"); // jo click kiya hai usko blue kar do

  nextBtn.disabled = false;
  nextBtn.onclick = () => {
    if (selectedIndex === questions[currentQuestionIndex].answer) {
      score++;
    }
    nextQuestion();
  };
}


// Next Question Function
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show Result Function
function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  scoreText.textContent = `You got ${score} out of ${questions.length} correct!`;
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
});

// Timer Function
function startTimer() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}
