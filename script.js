let users = {};
let username = '';
let score = 0;
let timer;
let difficulty = 'easy';
let questionHistory = [];
let hintCount = { arithmetic: 3, algebra: 3, geometry: 3, calculus: 3 };

document.addEventListener('DOMContentLoaded', () => {
    showSection('login');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    if (users[inputUsername] && users[inputUsername].password === inputPassword) {
        username = inputUsername;
        score = users[username].score;
        showSection('profile');
        loadProfile();
    } else {
        document.getElementById('login-message').textContent = 'Invalid username or password';
    }
}

function handleRegister(event) {
    event.preventDefault();
    const regUsername = document.getElementById('reg-username').value;
    const regPassword = document.getElementById('reg-password').value;

    if (users[regUsername]) {
        document.getElementById('register-message').textContent = 'Username already exists';
    } else {
        users[regUsername] = { password: regPassword, score: 0, achievements: [], history: [] };
        document.getElementById('register-message').textContent = 'Registration successful';
    }
}

function setDifficulty(level) {
    difficulty = level;
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById('time').textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up!');
            showSection('profile');
        }
    }, 1000);
}

function generateArithmeticQuestion() {
    startTimer();
    const questionContainer = document.getElementById('arithmetic-questions');
    questionContainer.innerHTML = '';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let correctAnswer, hint;
    let choices = [];
    
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

    choices.push(correctAnswer);
    while (choices.length < 4) {
        let choice = (Math.random() * 20).toFixed(2);
        if (!choices.includes(choice)) {
            choices.push(choice);
        }
    }
    choices.sort(() => Math.random() - 0.5);

    questionContainer.innerHTML = `
        <p>${question}</p>
        ${choices.map(choice => `<button onclick="checkAnswer('arithmetic', ${correctAnswer}, '${hint}', ${choice})">${choice}</button>`).join('')}
    `;
}

function generateAlgebraQuestion() {
    startTimer();
    const questionContainer = document.getElementById('algebra-questions');
    questionContainer.innerHTML = '';
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = ((7 - num2) / num1).toFixed(2);
    const hint = `Solve for x in ${num1}x + ${num2} = 7`;
    let choices = [];

    const question = `${num1}x + ${num2} = 7`;

    choices.push(correctAnswer);
    while (choices.length < 4) {
        let choice = ((Math.random() * 20) - 10).toFixed(2);
        if (!choices.includes(choice)) {
            choices.push(choice);
        }
    }
    choices.sort(() => Math.random() - 0.5);

    questionContainer.innerHTML = `
        <p>Solve for x: ${question}</p>
        ${choices.map(choice => `<button onclick="checkAnswer('algebra', ${correctAnswer}, '${hint}', ${choice})">${choice}</button>`).join('')}
    `;
}

function generateGeometryQuestion() {
    startTimer();
    const questionContainer = document.getElementById('geometry-questions');
    questionContainer.innerHTML = '';
    const radius = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = (Math.PI * radius * radius).toFixed(2);
    const hint = `Use the formula for the area of a circle: πr² where r is the radius`;
    let choices = [];

    const question = `What is the area of a circle with radius ${radius}?`;

    choices.push(correctAnswer);
    while (choices.length < 4) {
        let choice = (Math.random() * 100).toFixed(2);
        if (!choices.includes(choice)) {
            choices.push(choice);
        }
    }
    choices.sort(() => Math.random() - 0.5);

    questionContainer.innerHTML = `
        <p>${question}</p>
        ${choices.map(choice => `<button onclick="checkAnswer('geometry', ${correctAnswer}, '${hint}', ${choice})">${choice}</button>`).join('')}
    `;
}

function generateCalculusQuestion() {
    startTimer();
    const questionContainer = document.getElementById('calculus-questions');
    questionContainer.innerHTML = '';
    const correctAnswer = 2;
    const hint = `Differentiate the function f(x) = x² to find f'(x)`;
    let choices = [2, 0, 1, 4];

    const question = `What is the derivative of x^2?`;

    choices.sort(() => Math.random() - 0.5);

    questionContainer.innerHTML = `
        <p>${question}</p>
        ${choices.map(choice => `<button onclick="checkAnswer('calculus', ${correctAnswer}, '${hint}', ${choice})">${choice}</button>`).join('')}
    `;
}

function checkAnswer(section, correctAnswer, hint, userAnswer) {
    const explanationContainer = document.getElementById(`${section}-explanation`);
    const hintContainer = document.getElementById(`${section}-hint`);

    if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
        playSound('correct');
        alert('Correct!');
        score++;
        users[username].score = score;
        checkAchievements();
        hintContainer.style.display = 'none';
        explanationContainer.innerHTML = '';
        questionHistory.push({ section, correctAnswer, userAnswer: 'Correct' });
    } else {
        playSound('incorrect');
        alert(`Incorrect. The correct answer was ${correctAnswer}`);
        explanationContainer.innerHTML = `Explanation: ${hint}`;
        questionHistory.push({ section, correctAnswer, userAnswer: 'Incorrect' });
    }

    document.getElementById('score').textContent = score;
    saveUserData();
    updateQuestionHistory();

    switch (section) {
        case 'arithmetic':
            updateProgress('arithmetic');
            break;
        case 'algebra':
            updateProgress('algebra');
            break;
        case 'geometry':
            updateProgress('geometry');
            break;
        case 'calculus':
            updateProgress('calculus');
            break;
    }
}

function playSound(type) {
    const audio = new Audio(type === 'correct' ? 'correct.mp3' : 'incorrect.mp3');
    audio.play();
}

function updateProgress(section) {
    const progressBar = document.getElementById(`progress-${section}`).children[0];
    const completedQuestions = questionHistory.filter(q => q.section === section).length;
    const progressPercentage = (completedQuestions / 10) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function loadProfile() {
    document.getElementById('profile-username').textContent = `Username: ${username}`;
    document.getElementById('profile-score').textContent = `Score: ${score}`;
    const profileImg = document.getElementById('profile-img');
    const achievementsContainer = document.getElementById('achievements');
    achievementsContainer.innerHTML = '<h3>Achievements</h3>';
    
    users[username].achievements.forEach(achievement => {
        achievementsContainer.innerHTML += `<p>${achievement}</p>`;
    });

    if (users[username].profilePicture) {
        profileImg.src = users[username].profilePicture;
        profileImg.style.display = 'block';
    }
}

function checkAchievements() {
    if (score === 5 && !users[username].achievements.includes('Scored 5 Points')) {
        users[username].achievements.push('Scored 5 Points');
        alert('Achievement Unlocked: Scored 5 Points');
    }
    if (score === 10 && !users[username].achievements.includes('Scored 10 Points')) {
        users[username].achievements.push('Scored 10 Points');
        alert('Achievement Unlocked: Scored 10 Points');
    }
}

function uploadProfilePicture(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        users[username].profilePicture = e.target.result;
        loadProfile();
    };

    reader.readAsDataURL(file);
}

function updateQuestionHistory() {
    const historyContainer = document.getElementById('question-history');
    historyContainer.innerHTML = '<h3>Question History</h3>';

    questionHistory.forEach(item => {
        historyContainer.innerHTML += `<p>${item.section}: ${item.userAnswer} (Correct Answer: ${item.correctAnswer})</p>`;
    });
}

function showLeaderboard() {
    showSection('leaderboard');
    const leaderboardContainer = document.getElementById('leaderboard-content');
    leaderboardContainer.innerHTML = '<h3>Leaderboard</h3>';
    
    const sortedUsers = Object.entries(users).sort((a, b) => b[1].score - a[1].score);
    
    sortedUsers.forEach(([user, data]) => {
        leaderboardContainer.innerHTML += `<p>${user}: ${data.score} points</p>`;
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function startDailyChallenge() {
    alert('Complete the daily challenge to earn extra points!');
}

function showHint(section) {
    if (hintCount[section] > 0) {
        hintCount[section]--;
        document.getElementById(`hint-count-${section}`).textContent = hintCount[section];
        document.getElementById(`${section}-hint`).style.display = 'block';
    } else {
        alert('No hints left for this session!');
    }
}

function saveUserData() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUserData() {
    const data = localStorage.getItem('users');
    if (data) {
        users = JSON.parse(data);
    }
}

loadUserData();
