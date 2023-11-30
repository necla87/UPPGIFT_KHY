const prompt = require('prompt-sync')();
const User = require('./user');

function userID() {
  userID.counter = userID.counter || 1000;

  for (; userID.counter === 1000; userID.counter++) {
  }

  return userID.counter++;
}

function createNewAccount() {
  const id = generateSequentialUserId();
  const username = prompt('Enter a username: ');
  const password = prompt('Enter a password: ', { echo: '*' });
  const email = prompt('Enter an email: ');
  const phone = prompt('Enter a phone number: ');

  const newUser = new User(id, username, password, email, phone);

  users.push(newUser);
  console.log('Account created successfully!');
}

