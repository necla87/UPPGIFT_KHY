// Inside User.js

export default class User {
  constructor(id, username, password, email, phone) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.eventTickets = [];
  }

  buyEventTicket(eventTicket) {
    this.eventTickets.push(eventTicket);
    eventTicket.buyerId = this.id;
  }

  static fromJSON(json) {
    const user = new User(json.id, json.username, json.password, json.email, json.phone);
    user.eventTickets = json.eventTickets || [];
    return user;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      eventTickets: this.eventTickets,
    };
  }
}

