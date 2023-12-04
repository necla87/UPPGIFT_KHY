// Inside Admin.js

export default class Admin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static fromJSON(json) {
    return new Admin(json.username, json.password);
  }

  toJSON() {
    return {
      username: this.username,
      password: this.password,
    };
  }

  viewPurchasedUsers(eventTickets) {
    console.log('\nUsers who purchased tickets:');

    // Iterate over eventTickets and find users who purchased tickets
    eventTickets.forEach(event => {
      const user = users.find(user => user.id === event.buyerId);
      if (user) {
        console.log(`${user.username} - ${event.name}`);
      }
    });
  }
}