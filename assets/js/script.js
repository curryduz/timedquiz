window.addEventListener('DOMContentLoaded', () => {
	const myQuestions = [
		{
			question: "1. What does CSS stand for?",
			answers:{
				a: "Character Style Sheets",
				b: "Cascading Style Sheets ",
				c: "Creative Style Sheets",
				d: "Comma Style Sheets"
			},
			correctAnswer: "b"
		},
		{
			question: "2. What do you need to define an object?",
			answers:{
				a: "[ ]",
				b: "**",
				c: "{ }",
				d: "$$"
			},
			correctAnswer: "c"
		},
		{
			question: "3. Which of the following is not a pseudo class?",
			answers:{
				a: ":hover",
				b: ":selected",
				c: ":unchecked",
				d: ":active"
			},
			correctAnswer: "b"
		},
		{
			question: "4. Which CSS property can stick an element on your screen to ignore scrolling?",
			answers:{
				a: "positiom",
				b: "fix",
				c: "display",
				d: "float"
			},
			correctAnswer: "a"
		},
		{
			question: "5. Which command can be used to go into a newly created branch?",
			answers:{
				a: "git checkout new branch",
				b: "cd ..",
				c: "mkdir",
				d: "git checkout -b new branch"
			},
			correctAnswer: "d"
		},
		{
			question: "6. Arrays in JavaScript can be used to store:",
			answers:{
				a: "numbers & strings",
				b: "other arrays",
				c: "booleans",
				d: "all of the both"
			},
			correctAnswer: "d"
		}
	];

	// global variables
	let i = 0;
	let correctAnswers = 0;
	let wrongAnswers = 0;
	let timer = 75;
	let countdown;
	const answers = document.querySelector(".answers");
	const time = document.querySelector('.time');
	time.innerHTML = "Time: " + timer;


	// display questions when start button is clicked
	const start = document.getElementById("start");
	start.addEventListener("click", () => {
		document.querySelector(".page-start").classList.add("hide");
		document.querySelector(".quiz").classList.remove("hide");

		countdown = setInterval(function() {
			timer--;
			time.innerHTML = "Time: " + timer;

			if (timer === 0) {
				clearInterval(countdown);
				enterScore();
			}
		}, 1000);

		displayQuestion();
	});

	// function to display quiz
	function displayQuestion() {
		const question = document.querySelector(".question");
		question.innerHTML = myQuestions[i].question;

		for (const answer in myQuestions[i].answers) {
			const node = document.createElement("li");
			answers.appendChild(node);
			const singleAnswer = `${answer}. ${myQuestions[i].answers[answer]}`;
			node.innerHTML = singleAnswer;
		}

		const choices = document.querySelectorAll('.answers li');

		for (const element of choices) {
			element.addEventListener('click', () => {
				const correctAnswer = myQuestions[i].correctAnswer;
				validateAnswer(correctAnswer, element);
			});
		}
	}

	function validateAnswer(correctAnswer, element) {
		const selectedAnswer = element.innerHTML;
		const userAnswer = selectedAnswer.split('.');
		const displayAnswer = document.querySelector(".answer");

		if (userAnswer[0] === correctAnswer) {
			displayAnswer.innerHTML = "Correct!"
			correctAnswers++;
		} else {
			displayAnswer.innerHTML = "Incorrect!"
			wrongAnswers++;
			timer = timer - 5;
		}

		displayAnswer.classList.toggle('hide');

		setTimeout(function() {
			displayNextQuestion(displayAnswer);
		}, 2000);
	}

	function displayNextQuestion(displayAnswer) {
		displayAnswer.classList.toggle('hide');
		answers.innerHTML = '';
		if (i <= 4) {
			i++;
			displayQuestion();
		} else {
			clearInterval(countdown);
			enterScore();
		}
	}

	function enterScore() {
		document.querySelector(".quiz").classList.add("hide");
		document.querySelector(".end-quiz").classList.remove("hide");
		document.querySelector('.end-quiz p').innerHTML = "Your final score is: " + correctAnswers + "/6";

		const submit = document.getElementById("submit");
		submit.addEventListener('click', (e) => {
			e.preventDefault();
			const userInput = document.getElementById('username').value;
			const scores = [correctAnswers, userInput];
			localStorage.setItem('score', JSON.stringify(scores));
			window.location.href='./high-scores.html';
		});
	}
});