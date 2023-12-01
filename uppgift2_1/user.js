export default class User {
  constructor(id, username, password, email, phone, isAdmin = false, eventTickets = []) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.isAdmin = isAdmin;
    this.eventTickets = eventTickets;
  }

  addEventTicket(eventTicketId) {
    this.eventTickets.push(eventTicketId);
  }
}