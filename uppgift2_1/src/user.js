// Inside User.js

export default class User {
  constructor(id, username, password, email, phone, eventTickets) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.eventTickets = eventTickets || [];
  }

  static fromJSON(json) {
    return new User(
      json.id,
      json.username,
      json.password,
      json.email,
      json.phone,
      json.eventTickets
    );
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      eventTickets: this.eventTickets
    };
  }

  buyEventTicket(eventId) {
    this.eventTickets.push(eventId);
  }
}
