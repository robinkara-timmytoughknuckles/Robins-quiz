// Hämtar home-section från HTML
let homeSection = document.getElementById("home-section");

// Hämtar namnsida från HTML
let nameSection = document.getElementById("namnsida");

// Hämtar START QUIZ-knappen från HTML
let startQuizButton = document.querySelector("#header button")

// Hämtar quizets startsida
let startSection = document.getElementById("startsida");


// Kollar om man klickar på start quiz knappen
startQuizButton.addEventListener("click", function() {

    //gömmer start-sektionen
    startSection.style.display = "none";

    // Visar namnsidan
    nameSection.style.display = "block";

});

// Hämtar input-rutan där spelaren skriver sitt namn
let nameInput = document.getElementById("player-name");

// Hämtar Continue-knappen
let continueButton = document.getElementById("continue-button");

// Skapar en variabel för spelarens namn
let playerName = "";


// Hämtar quiz-sidan från HTML
let quizSection = document.getElementById("quiz-section");

// Kollar om man klickar på Continue
continueButton.addEventListener("click", function() {

    // Hämtar namnet som spelaren har skrivit (AI)
    playerName = nameInput.value;

    // Gömmer namnsidan
    nameSection.style.display = "none";

    // Visar quiz-sidan
    quizSection.style.display = "block";

    // Visar första frågan
    showQuestion();

});

// Hämtar svarsknapparna från HTML (AI)
let answer1 = document.getElementById("answer-1");
let answer2 = document.getElementById("answer-2");
let answer3 = document.getElementById("answer-3");
let answer4 = document.getElementById("answer-4");

// Hämtar Continue-knappen
let nextButton = document.getElementById("next-button");

// Hämtar frågetexten
let questionText = document.getElementById("question");

// Hämtar bilden
let questionImage = document.getElementById("question-image");


// Spelare börjar med 0 poäng
let score = 0;

// Håller reda på vilken fråga spelaren är på (AI)
let currentQuestion = 0;

// Alla frågor i quizet
let questions = [
    {
        question: "Which player is this?",
        image: "upamecano.jpg",
        answers: ["Jonathan Tah", "Dayot Upamecano", "Hiroki Ito", "Kim Min Jae"],
        correctAnswer: 1
    },
    {
        question: "Which player is this?",
        image: "urbig.jpg",
        answers: ["Manuel Neuer", "Sven Ulreich", "Jonas Urbig", "Daniel Peretz"],
        correctAnswer: 2
    },
    {
        question: "Which player is this?",
        image: "kane.jpg",
        answers: ["Harry Kane", "Ismael Saibari", "Luis Díaz", "Serge Gnabry"],
        correctAnswer: 0
    },
    {
        question: "Which player is this?",
        image: "bischof.jpg",
        answers: ["Aleksandar Pavlovic", "Leon Goretzka", "Tom Bischof", "Joshua Kimmich"],
        correctAnswer: 2
    },
    {
        question: "Which player is this?",
        image: "olise.jpg",
        answers: ["Leroy Sané", "Kingsley Coman", "Jamal Musiala", "Michael Olise"],
        correctAnswer: 3
    }
];


// Laddar alla bilder i förväg (AI)
questions.forEach(function(question) {
    let image = new Image();
    image.src = question.image;
});

// Funktion som visar frågan
function showQuestion() {

    // Hämtar den aktuella frågan från listan 
    let question = questions[currentQuestion];

    // Visar frågetexten (AI)
    questionText.textContent = question.question;

    // Visar rätt bild (AI)
    questionImage.src = question.image;

    // Visar svarsalternativen (AI)
    answer1.textContent = question.answers[0];
    answer2.textContent = question.answers[1];
    answer3.textContent = question.answers[2];
    answer4.textContent = question.answers[3];
}

// Funktion som kontrollerar spelarens svar 
function checkAnswer(button, answerIndex) {

    // Hämtar den aktuella frågan 
    let question = questions[currentQuestion];

    // Kontrollerar om svaret är rätt
    if (answerIndex == question.correctAnswer) {

        button.style.backgroundColor = "green";

        // Ger 1 poäng
        score = score + 1;
    }
    else {
        // Gör svaret rött om det är fel
        button.style.backgroundColor = "red";
    }

    // Stänger av alla svarsknappar
    answer1.disabled = true;
    answer2.disabled = true;
    answer3.disabled = true;
    answer4.disabled = true;

    // Visar Continue-knappen
    nextButton.style.display = "block";
}

// Kollar om spelaren klickar på svar 1
answer1.addEventListener("click", function() {
    checkAnswer(answer1, 0);
});

// Kollar om spelaren klickar på svar 2
answer2.addEventListener("click", function() {
    checkAnswer(answer2, 1);
});

// Kollar om spelaren klickar på svar 3
answer3.addEventListener("click", function() {
    checkAnswer(answer3, 2);
});

// Kollar om spelaren klickar på svar 4
answer4.addEventListener("click", function() {
    checkAnswer(answer4, 3);
});

// Kollar om spelaren klickar på Continue
nextButton.addEventListener("click", function() {

    // Går vidare till nästa fråga
    currentQuestion = currentQuestion + 1;

      // Kollar om det finns fler frågor
      if (currentQuestion < questions.length) {

        // Visar nästa fråga
        showQuestion();
  
          // Aktiverar svarsknapparna igen
          answer1.disabled = false;
          answer2.disabled = false;
          answer3.disabled = false;
          answer4.disabled = false;
        
          // Återställer färgerna på svarsknapparna
          answer1.style.backgroundColor = "#181A1B";
          answer2.style.backgroundColor = "#181A1B";
          answer3.style.backgroundColor = "#181A1B";
          answer4.style.backgroundColor = "#181A1B";
  
          // Gömmer Continue-knappen
          nextButton.style.display = "none";
      }
  
      // Om det inte finns fler frågor
      else {
          saveResult();
          quizSection.style.display = "none";
          resultSection.style.display = "block";
          showResults();
      }
  });

// Lista som sparar alla spelares resultat (AI)
let results = []; 

// Hämtar resultatsidan från HTML
let resultSection = document.getElementById("result-section");

// Hämtar tabellen från HTML
let resultsTable = document.getElementById("results-table");

// Hämtar Play Again-knappen från HTML
let playAgainButton = document.getElementById("play-again-button");

// Funktion som sparar spelarens resultat
function saveResult() {

    // Lägger till spelarens namn och poäng i listan (AI)
    results.push({
        name: playerName,
        score: score
    });

}

// Funktion som visar resultatet i tabellen
function showResults() {

    // Lägger till en ny rad i tabellen (AI)
    resultsTable.innerHTML += "<tr><td>" + playerName + "</td><td>" + score + "/5</td></tr>";
}

// Kollar om spelaren klickar på Play Again
playAgainButton.addEventListener("click", function() {

    // Gömmer resultatsidan
    resultSection.style.display = "none";

    // Visar namnsidan igen
    nameSection.style.display = "block";

    // Återställer poängen
    score = 0;

    // Börjar om från första frågan
    currentQuestion = 0;

    // Tömmer namnrutan
    nameInput.value = "";

    // Aktiverar svarsknapparna igen
    answer1.disabled = false;
    answer2.disabled = false;
    answer3.disabled = false;
    answer4.disabled = false;

    // Återställer färgerna på svarsknapparna
    answer1.style.backgroundColor = "#181A1B";
    answer2.style.backgroundColor = "#181A1B";
    answer3.style.backgroundColor = "#181A1B";
    answer4.style.backgroundColor = "#181A1B";

    // Gömmer Continue-knappen
    nextButton.style.display = "none";

});

