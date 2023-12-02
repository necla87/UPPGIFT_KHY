import fs from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';
export default class User {
  constructor(id, username, password, email, phone) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.eventTickets = [];
  }

  // Method for buying event tickets
  buyEventTicket(eventTicket) {
    // Assuming eventTicket has a property 'availableSeats' that represents available tickets
    if (eventTicket && eventTicket.availableSeats > 0) {
      // Deduct available seat and add the user to purchasedUsers
      eventTicket.availableSeats--;
      if (!eventTicket.purchasedUsers) {
        eventTicket.purchasedUsers = [];
      }
      eventTicket.purchasedUsers.push(this);

      // Add the event ticket to the user's list of purchased tickets
      this.eventTickets.push(eventTicket);

      console.log(`Ticket for ${eventTicket.name} purchased successfully.`);
    } else {
      console.log('No available seats for this event.');
    }
  }

  // Serialization method to convert User object to JSON
  toJSON() {
    return JSON.stringify(this);
  }

  // Deserialization method to create a User object from JSON
  static fromJSON(json) {
    const userData = JSON.parse(json);
    const user = new User(userData.id, userData.username, userData.password, userData.email, userData.phone);
    user.eventTickets = userData.eventTickets || [];
    return user;
  }

  // Additional method to save user data to a JSON file
  saveToFile(filePath) {
    try {
      fs.writeFileSync(filePath, this.toJSON());
      console.log('User data saved successfully.');
    } catch (error) {
      console.error('Error saving user data to file:', error.message);
    }
  }

  // Additional method to load user data from a JSON file
  static loadFromFile(filePath) {
    try {
      const json = fs.readFileSync(filePath, 'utf8');
      return User.fromJSON(json);
    } catch (error) {
      console.error('Error loading user data from file:', error.message);
      return null;
    }
  }
}

