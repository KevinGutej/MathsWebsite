let score = 0;

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
    showSection('arithmetic');
    generateArithmeticQuestion();
    generateAlgebraQuestion();
    generateGeometryQuestion();
    generateCalculusQuestion();
});

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
