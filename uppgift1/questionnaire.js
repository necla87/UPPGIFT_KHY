const fs = require("fs");
const prompt = require("prompt-sync")();

function loadQuestionnaire() {
  const filePath = "./questionnaire.json";

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } else {
    console.error("Error: Questionnaire file not found.");
    return [];
  }
}

function saveUserAnswers(userAnswers) {
  const filePath = "./answers.json";

  fs.writeFileSync(filePath, JSON.stringify(userAnswers, null, 2), (error) => {
    if (error) {
      console.error("Error saving user answers:", error.message);
      return;
    }

    console.log("User answers saved successfully to " + filePath);
  });
}

const userName = prompt("What is your name? ");
console.log(`Hello, ${userName}! Let's determine which pet suits you best.`);

const currentDate = new Date();
const dateTime = currentDate.toLocaleString();

const questionnaire = loadQuestionnaire();

const scores = {
  cat: 0,
  dog: 0,
  rabbit: 0,
  fish: 0,
};

const userAnswers = [
  {
    name: userName,
    dateTime: dateTime,
  },
];

for (let questionNumber = 0; questionNumber < questionnaire.length; questionNumber++) {
  const questionObj = questionnaire[questionNumber];
  console.log(`Question ${questionNumber + 1}: ${questionObj.question}`);
  console.log("Choose an answer (1 or 2):");

  for (let answerNumber = 0; answerNumber < questionObj.answers.length; answerNumber++) {
    const answer = questionObj.answers[answerNumber];
    console.log(`${answerNumber + 1}. ${answer.answerText}`);
  }

  let userChoice;
  let chosenAnswer;

  while (true) {
    userChoice = prompt("Enter the number of your choice: ");
    chosenAnswer = questionObj.answers[parseInt(userChoice) - 1];

    if (userChoice === "1" || userChoice === "2") {
      break;
    } else {
      console.warn("An incorrect answer. Please use only 1 or 2.");
    }
  }

  for (const pet in chosenAnswer.scores) {
    scores[pet] += chosenAnswer.scores[pet];
  }

  userAnswers.push({
    question: questionObj.question,
    userChoice: chosenAnswer.answerText,
  });
}

const totalScore = scores.cat + scores.dog + scores.rabbit + scores.fish;

const percentages = {
  cat: ((scores.cat / totalScore) * 100).toFixed(2),
  dog: ((scores.dog / totalScore) * 100).toFixed(2),
  rabbit: ((scores.rabbit / totalScore) * 100).toFixed(2),
  fish: ((scores.fish / totalScore) * 100).toFixed(2),
};

let bestPet = "cat";
for (const pet in percentages) {
  if (percentages[pet] > percentages[bestPet]) {
    bestPet = pet;
  }
}

console.log(`Following are the percentages based on your answers:`);
console.log(`Cat: ${percentages.cat}%`);
console.log(`Dog: ${percentages.dog}%`);
console.log(`Rabbit: ${percentages.rabbit}%`);
console.log(`Fish: ${percentages.fish}%`);

console.log(`\nYour ideal pet is a ${bestPet}.`);

userAnswers.push({
  result: `Your answers suggest a ${bestPet} pet is best suited for your lifestyle.`,
});

saveUserAnswers(userAnswers);
