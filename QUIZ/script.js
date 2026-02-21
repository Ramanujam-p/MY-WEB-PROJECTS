let timeLeft = 20;
let timer = setInterval(updateTimer, 1000);
function updateTimer() {
    timeLeft--;
    document.getElementById("timer").innerText = "Time Left: " + timeLeft + " seconds";
    if (timeLeft === 5) {
        document.getElementById("warning").style.display = "block";
    }
    if (timeLeft <= 0) {
        clearInterval(timer);
        submitQuiz();
    }
}
function submitQuiz() {

    clearInterval(timer);
    let score = 0;
    const answers = {
        q1: "CSS",
        q2: ["React", "Angular"],
        q3: "Hyper Text Markup Language",
        q4: "James Gosling"
    };
    let q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === answers.q1) {
        score++;
    }
    let selected = document.querySelectorAll('input[name="q2"]:checked');
    let selectedValues = Array.from(selected).map(cb => cb.value);

    if (selectedValues.length === answers.q2.length &&
        answers.q2.every(val => selectedValues.includes(val))) {
        score++;
    }
    let q3 = document.querySelector('select[name="q3"]').value;
    if (q3 === answers.q3) {
        score++;
    }
    let q4 = document.querySelector('input[name="q4"]').value.trim();
    if (q4.toLowerCase() === answers.q4.toLowerCase()) {
        score++;
    }

    let q5 = document.querySelector('textarea[name="q5"]').value.trim();
    if (q5 !== "") {
        score++;
    }
    document.getElementById("quizForm").style.display = "none";

    
    document.getElementById("result").innerHTML =
        "Your Score: " + score + " / 5 <br><br>" +
        "Correct Answers:<br>" +
        "1. CSS<br>" +
        "2. React & Angular<br>" +
        "3. Hyper Text Markup Language<br>" +
        "4. James Gosling<br>";

}