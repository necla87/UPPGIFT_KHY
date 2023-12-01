export default class Admin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login(enteredUsername, enteredPassword) {
    return this.username === enteredUsername && this.password === enteredPassword;
  }
}
