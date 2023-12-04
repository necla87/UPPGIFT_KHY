// Inside Admin.js

export default class Admin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  viewPurchasedUsers(eventTickets) {
    console.log('\nUsers who purchased tickets:\n');

    eventTickets.forEach((eventTicket) => {
      if (eventTicket.buyerId) {
        const user = users.find(user => user.id === eventTicket.buyerId);
        console.log(`Event: ${eventTicket.eventName}, User: ${user.username}`);
      }
    });

    if (!eventTickets.some(eventTicket => eventTicket.buyerId)) {
      console.log('No users have purchased tickets yet.');
    }
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
}

