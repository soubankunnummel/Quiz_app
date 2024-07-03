const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: 0
    },
    // Add 8 more questions here
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeSpent = new Array(questions.length).fill(0);
let startTime;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const totalScoreElement = document.getElementById("total-score");
const timeListElement = document.getElementById("time-list");

function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = `Question ${currentQuestion + 1}: ${question.question}`;
    
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectOption(index));
        if (userAnswers[currentQuestion] === index) {
            button.style.backgroundColor = "#007bff";
        }
        optionsContainer.appendChild(button);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
    
    startTime = new Date();
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion();
}

function nextQuestion() {
    updateTimeSpent();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    updateTimeSpent();
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function updateTimeSpent() {
    const endTime = new Date();
    timeSpent[currentQuestion] += (endTime - startTime) / 1000;
}

function finishQuiz() {
    updateTimeSpent();
    score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 10 : 0);
    }, 0);

    document.getElementById("question-container").style.display = "none";
    document.querySelector(".navigation").style.display = "none";
    resultContainer.style.display = "block";

    totalScoreElement.textContent = `Your total score: ${score} out of 100`;

    timeListElement.innerHTML = timeSpent.map((time, index) => 
        `<li>Question ${index + 1}: ${time.toFixed(2)} seconds</li>`
    ).join("");
}

prevBtn.addEventListener("click", prevQuestion);
nextBtn.addEventListener("click", nextQuestion);

loadQuestion();