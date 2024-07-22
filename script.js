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

function handleRegister(event) {
    event.preventDefault();
    const regUsername = document.getElementById('reg-username').value;
    const regPassword = document.getElementById('reg-password').value;

    if (!users[regUsername]) {
        users[regUsername] = { password: regPassword, score: 0, achievements: [] };
        document.getElementById('register-message').textContent = 'Registration successful!';
    } else {
        document.getElementById('register-message').textContent = 'Username already exists!';
    }
}

function handleLogin(event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        score = users[username].score;
        document.getElementById('score').textContent = score;
        showSection('arithmetic');
        loadProfile();
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
    let hint;

    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            hint = `Addition: Combine the values of ${num1} and ${num2}`;
            break;
        case '-':
            correctAnswer = num1 - num2;
            hint = `Subtraction: Subtract ${num2} from ${num1}`;
            break;
        case '*':
            correctAnswer = num1 * num2;
            hint = `Multiplication: Multiply ${num1} and ${num2}`;
            break;
        case '/':
            correctAnswer = (num1 / num2).toFixed(2);
            hint = `Division: Divide ${num1} by ${num2}`;
            break;
    }

    const question = `${num1} ${operation} ${num2} = ?`;
    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="arithmetic-answer" placeholder="Your answer">
        <button onclick="checkAnswer('arithmetic', ${correctAnswer}, '${hint}')">Check Answer</button>
    `;
}

function generateAlgebraQuestion() {
    const questionContainer = document.getElementById('algebra-questions');
    questionContainer.innerHTML = '';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = (7 - num2) / num1;
    const hint = `Solve for x in ${num1}x + ${num2} = 7`;

    const question = `${num1}x + ${num2} = 7`;
    questionContainer.innerHTML = `
        <p>Solve for x: ${question}</p>
        <input type="text" id="algebra-answer" placeholder="Your answer">
        <button onclick="checkAnswer('algebra', ${correctAnswer}, '${hint}')">Check Answer</button>
    `;
}

function generateGeometryQuestion() {
    const questionContainer = document.getElementById('geometry-questions');
    questionContainer.innerHTML = '';
    const radius = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = (Math.PI * radius * radius).toFixed(2);
    const hint = `Use the formula for the area of a circle: πr² where r is the radius`;

    const question = `What is the area of a circle with radius ${radius}?`;
    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="geometry-answer" placeholder="Your answer">
        <button onclick="checkAnswer('geometry', ${correctAnswer}, '${hint}')">Check Answer</button>
    `;
}

function generateCalculusQuestion() {
    const questionContainer = document.getElementById('calculus-questions');
    questionContainer.innerHTML = '';
    const correctAnswer = 2;
    const hint = `Differentiate the function f(x) = x² to find f'(x)`;

    const question = `What is the derivative of x^2?`;
    questionContainer.innerHTML = `
        <p>${question}</p>
        <input type="text" id="calculus-answer" placeholder="Your answer">
        <button onclick="checkAnswer('calculus', ${correctAnswer}, '${hint}')">Check Answer</button>
    `;
}

function showHint(section) {
    const hintContainer = document.getElementById(`${section}-hint`);
    hintContainer.style.display = 'block';
}

function checkAnswer(section, correctAnswer, hint) {
    const answerInput = document.getElementById(`${section}-answer`);
    const userAnswer = parseFloat(answerInput.value);
    const explanationContainer = document.getElementById(`${section}-explanation`);
    const hintContainer = document.getElementById(`${section}-hint`);

    if (userAnswer === correctAnswer) {
        alert('Correct!');
        score++;
        users[username].score = score;
        checkAchievements();
        hintContainer.style.display = 'none';
        explanationContainer.innerHTML = '';
    } else {
        alert(`Incorrect. The correct answer was ${correctAnswer}`);
        explanationContainer.innerHTML = `Explanation: ${hint}`;
    }

    document.getElementById('score').textContent = score;
    saveUserData();

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

function loadProfile() {
    const profileUsername = document.getElementById('profile-username');
    const profileScore = document.getElementById('profile-score');
    const achievementsContainer = document.getElementById('achievements');

    profileUsername.textContent = `Username: ${username}`;
    profileScore.textContent = `Score: ${score}`;

    achievementsContainer.innerHTML = '<h3>Achievements</h3>';
    users[username].achievements.forEach(achievement => {
        achievementsContainer.innerHTML += `<p>${achievement}</p>`;
    });
}

function saveUserData() {
    users[username].score = score;
}

function checkAchievements() {
    const achievements = users[username].achievements;

    if (score >= 10 && !achievements.includes('Scored 10 Points')) {
        achievements.push('Scored 10 Points');
        alert('Achievement unlocked: Scored 10 Points');
    }
    if (score >= 20 && !achievements.includes('Scored 20 Points')) {
        achievements.push('Scored 20 Points');
        alert('Achievement unlocked: Scored 20 Points');
    }

    loadProfile();
}
