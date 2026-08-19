const startScreen=document.getElementById("start_screen");
const quizScreen=document.getElementById("quiz_screen");
const resultScreen=document.getElementById("result_screen");
const startButton=document.getElementById("start_btn");
const questionText=document.getElementById("question");
const currentQuestionSpan=document.getElementById("current_question");
const totalQuestionSpan=document.getElementById("total_questions");
const scoreSpan=document.getElementById("score");
const finalScoreSpan=document.getElementById("final_score");
const maxScoreSpan=document.getElementById("max_score");
const resultMessage=document.getElementById("result_message");
const restartButton=document.getElementById("restart_btn");
const progressBar=document.getElementById("progress");
const answersContainer=document.getElementById("answers_container");

const quizQuestions = [
    {
        question: "What does CIA stand for in cybersecurity?",
        answers: [
            { text: "Confidentiality, Integrity, Availability", correct: true },
            { text: "Cybersecurity, Intelligence, Authentication", correct: false },
            { text: "Control, Information, Access", correct: false },
            { text: "Confidentiality, Identification, Authorization", correct: false }
        ]
    },
    {
        question: "Which of the following is a strong password?",
        answers: [
            { text: "password123", correct: false },
            { text: "qwerty2026", correct: false },
            { text: "Nehan123", correct: false },
            { text: "T9#vL2@pQ7!x", correct: true }
        ]
    },
    {
        question: "What is phishing?",
        answers: [
            { text: "A method of encrypting files", correct: false },
            { text: "An attack that tricks users into revealing sensitive information", correct: true },
            { text: "A tool used to scan network ports", correct: false },
            { text: "A method of backing up data", correct: false }
        ]
    },
    {
        question: "Which tool is commonly used to capture and analyze network traffic?",
        answers: [
            { text: "Wireshark", correct: true },
            { text: "Microsoft Word", correct: false },
            { text: "Photoshop", correct: false },
            { text: "Notepad", correct: false }
        ]
    },
    {
        question: "What is the main purpose of a firewall?",
        answers: [
            { text: "To create strong passwords", correct: false },
            { text: "To physically protect a computer", correct: false },
            { text: "To monitor and control network traffic", correct: true },
            { text: "To increase internet speed", correct: false }
        ]
    }
];

let currentQuestionIndex=0;
let score=0;
let answerDisabled=false;

totalQuestionSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    // alert("Quiz Started!");
    currentQuestionIndex=0;
    scoreSpan.textContent=0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion(){
    answerDisabled=false;
    const currentQuestion=quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent=currentQuestionIndex+1;

    const progressPercent=(currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";

    questionText.textContent=currentQuestion.question;

    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer_btn");

        button.dataset.correct=answer.correct;

        button.addEventListener("click", selectAnswer)
        answersContainer.appendChild(button);
    })
}

function selectAnswer(event){
    if(answerDisabled){
        return
    }
    answerDisabled=true;

    const selectedButton=event.target;
    const isCorrect=selectedButton.dataset.correct==="true";

    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        } else{
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent=score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();
        } else{
            showResults();
        }
    }, 1000);
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent=score;

    const percentage=(score/quizQuestions.length)*100;
    if(percentage===100){
        resultMessage.textContent="Perfect!";
    }
    else if (percentage>=80) {
        resultMessage.textContent="Great job!";
    } 
    else if (percentage>=60) {
        resultMessage.textContent="Good effort!";
    } 
    else if (percentage>=40) {
        resultMessage.textContent="Not bad!";
    } 
    else {
        resultMessage.textContent="Keep trying!";
    } 
}

function restartQuiz(){
    // alert("Quiz Restarted!");
    resultScreen.classList.remove("active");
    startQuiz();
}