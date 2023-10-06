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

  try {
   
    fs.writeFileSync(filePath, JSON.stringify(userAnswers, null, 2));
    console.log("User answers saved successfully to " + filePath);
  } catch (error) {
    
    console.error("Error saving user answers:", error.message);
  }
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

questionnaire.forEach((questionObj, index) => {
  console.log(`Question ${index + 1}: ${questionObj.question}`);
  console.log("Choose an answer:");

  questionObj.answers.forEach((answer, answerIndex) => {
    console.log(`${answerIndex + 1}. ${answer.answerText}`);
  });

  const userChoice = prompt("Enter the number of your choice: ");
  const chosenAnswer = questionObj.answers[parseInt(userChoice) - 1];

 
  for (const pet in chosenAnswer.scores) {
    scores[pet] += chosenAnswer.scores[pet];
  }


  userAnswers.push({
    question: questionObj.question,
    userChoice: chosenAnswer.answerText,
  });
});


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

console.log(`Based on your answers, here are the suitability percentages for each pet:`);
console.log(`Cat: ${percentages.cat}%`);
console.log(`Dog: ${percentages.dog}%`);
console.log(`Rabbit: ${percentages.rabbit}%`);
console.log(`Fish: ${percentages.fish}%`);

console.log(`\nThe pet that best suits you is a ${bestPet}.`);


userAnswers.push({
  result: `Based on your answers, the pet that best suits you is a ${bestPet}.`,
});

saveUserAnswers(userAnswers);

