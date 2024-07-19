let score = 0;
let username = '';
let users = {};

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('login');
});

function handleLogin(event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!users[username]) {
        users[username] = { password: password, score: 0 };
    }

    if (users[username].password === password) {
        score = users[username].score;
        document.getElementById('score').textContent = score;
        showSection('arithmetic');
    } else {
        document.getElementById('login-message').textContent = 'Invalid username or password';
    }
}

function generateArithmeticQuestion() {
    const questionContainer = document.getElementById('arithmetic-questions');
    questionContainer.innerHTML = '';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    let correctAnswer;

    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = (num1 / num2).toFixed(2);
            break;
    }

    const question = `${num1} ${operation} ${num2} = ?`;
    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="arithmetic-answer" placeholder="Your answer">
        <button onclick="checkAnswer('arithmetic', ${correctAnswer})">Check Answer</button>
    `;
}

function generateAlgebraQuestion() {
    const questionContainer = document.getElementById('algebra-questions');
    questionContainer.innerHTML = '';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = (7 - num2) / num1;

    const question = `${num1}x + ${num2} = 7`;
    questionContainer.innerHTML = `
        <p>Solve for x: ${question}</p>
        <input type="text" id="algebra-answer" placeholder="Your answer">
        <button onclick="checkAnswer('algebra', ${correctAnswer})">Check Answer</button>
    `;
}

function generateGeometryQuestion() {
    const questionContainer = document.getElementById('geometry-questions');
    questionContainer.innerHTML = '';
    const radius = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = (Math.PI * radius * radius).toFixed(2);

    const question = `What is the area of a circle with radius ${radius}?`;
    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="geometry-answer" placeholder="Your answer">
        <button onclick="checkAnswer('geometry', ${correctAnswer})">Check Answer</button>
    `;
}

function generateCalculusQuestion() {
    const questionContainer = document.getElementById('calculus-questions');
    questionContainer.innerHTML = '';
    const correctAnswer = 2;

    const question = `What is the derivative of x^2?`;
    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="calculus-answer" placeholder="Your answer">
        <button onclick="checkAnswer('calculus', ${correctAnswer})">Check Answer</button>
    `;
}

function checkAnswer(section, correctAnswer) {
    const answerInput = document.getElementById(`${section}-answer`);
    const userAnswer = parseFloat(answerInput.value);

    if (userAnswer === correctAnswer) {
        alert('Correct!');
        score++;
    } else {
        alert(`Incorrect. The correct answer was ${correctAnswer}`);
    }

    document.getElementById('score').textContent = score;
    users[username].score = score;

    switch (section) {
        case 'arithmetic':
            generateArithmeticQuestion();
            break;
        case 'algebra':
            generateAlgebraQuestion();
            break;
        case 'geometry':
            generateGeometryQuestion();
            break;
        case 'calculus':
            generateCalculusQuestion();
            break;
    }
}

function displayLeaderboard() {
    const leaderboardContent = document.getElementById('leaderboard-content');
    leaderboardContent.innerHTML = '<h3>Leaderboard</h3>';
    const sortedUsers = Object.keys(users).sort((a, b) => users[b].score - users[a].score);
    sortedUsers.forEach(user => {
        const userScore = users[user].score;
        leaderboardContent.innerHTML += `<p>${user}: ${userScore}</p>`;
    });
}

function showLeaderboard() {
    showSection('leaderboard');
    displayLeaderboard();
}

document.querySelector('nav ul').innerHTML += `<li><a href="#" onclick="showLeaderboard()">Leaderboard</a></li>`;
