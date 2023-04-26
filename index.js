let currentQuestionIndex = 1;
const questionContainer = document.querySelector(".question-container");
const questions = questionContainer.querySelectorAll(".question");

function nextQuestion() {
  questions[currentQuestionIndex - 1].classList.remove("active");
  currentQuestionIndex =
    currentQuestionIndex === questions.length ? 1 : currentQuestionIndex + 1;
  questions[currentQuestionIndex - 1].classList.add("active");
}
function backQuestion() {
  questions[currentQuestionIndex - 1].classList.remove("active");
  currentQuestionIndex =
    currentQuestionIndex === 1 ? questions.length : currentQuestionIndex - 1;
  questions[currentQuestionIndex - 1].classList.add("active");
}

function goToQuestion() {
  questions[currentQuestionIndex - 1].classList.remove("active");

  // 입력된 문제 번호를 가져옵니다.
  const questionNum = document.getElementById("questionNumInput").value;

  // 해당 문제 번호에 해당하는 문제 ID를 가져옵니다.
  const questionId = `question${questionNum}`;

  // 해당 문제가 존재하는지 확인합니다.
  const targetQuestion = document.getElementById(questionId);
  if (!targetQuestion) {
    alert(`Question ${questionNum} does not exist!`);
    return;
  }

  // 해당 문제 위치로 스크롤합니다.
  questions[questionNum - 1].classList.add("active");
}
