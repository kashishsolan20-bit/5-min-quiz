const quiz = [
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Google", "Netscape", "Apple"],
        answer: 2
    },
    {
        question: "Which data structure works on FIFO principle?",
        options: ["Stack", "Queue", "Array", "Tree"],
        answer: 1
    },
    {
        question: "If 5 + 3 × 2 = ?",
        options: ["16", "11", "13", "10"],
        answer: 1
    },
    {
        question: "Which Indian city is known as the Silicon Valley of India?",
        options: ["Delhi", "Mumbai", "Bangalore", "Hyderabad"],
        answer: 2
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
    },
];

let currentQ = 0;
let score = 0;

function clearWarning() {
    document.getElementById("warning").innerText = "";
}

function loadQuestion() {
    const q = quiz[currentQ];
    document.getElementById("question").innerText = q.question;

    let optionsHTML = "";
    q.options.forEach((opt, index) => {
        optionsHTML += `
        <label class="option-box">
            <input type="radio" name="option" value="${index}" onclick="clearWarning()">
            <span>${opt}</span>
        </label>
        `;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function nextQuestion() {
    const selected = document.querySelector('input[name="option"]:checked');
    const warning = document.getElementById("warning");

    if (!selected) {
        warning.innerText = "⚠ Please select an option!";
        return;
    }

    warning.innerText = "";

    if (parseInt(selected.value) === quiz[currentQ].answer) {
        score++;
    }

    currentQ++;

    if (currentQ < quiz.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    let message = "";

    if (score < 3) {
        message = "Nice try! Better luck next time 👍";
    } else {
        message = "Good job! 🎉";
    }

    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Finished</h2>
        <p>Your Score: ${score}/${quiz.length}</p>
        <h3>${message}</h3>
    `;
}

/* TIMER (5 MINUTES) */
let time = 300;

const timer = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText = 
        `⏳ ${minutes}:${seconds}`;

    time--;

    if (time < 0) {
        clearInterval(timer);
        endQuiz();
    }

}, 1000);

// start quiz
loadQuestion();
