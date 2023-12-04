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

  viewPurchasedUsers(users) {
    console.log('\nUsers who purchased tickets:');
    users.forEach(user => {
      if (user.eventTickets.length > 0) {
        console.log(`\n${user.username}'s purchased tickets:`);
        user.eventTickets.forEach(ticket => {
          console.log(`- Event: ${ticket.name}, Price: ${ticket.price} SEK, Time: ${ticket.time}`);
        });
      }
    });
  }
}