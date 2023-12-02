import fs from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';

export default class Admin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  viewPurchasedUsers(eventTicket) {
    // Assuming eventTicket has a property 'purchasedUsers' that stores user information
    if (eventTicket && eventTicket.purchasedUsers) {
      console.log(`Users who purchased tickets for ${eventTicket.name}:`);
      eventTicket.purchasedUsers.forEach((user) => {
        console.log(`- ${user.username}`);
      });
    } else {
      console.log('No users have purchased tickets for this event.');
    }
  }

  // Serialization method to convert Admin object to JSON
  toJSON() {
    return JSON.stringify(this);
  }

  // Deserialization method to create an Admin object from JSON
  static fromJSON(json) {
    const adminData = JSON.parse(json);
    return new Admin(adminData.username, adminData.password);
  }

  // Additional method to save admin data to a JSON file
  saveToFile(filePath) {
    try {
      fs.writeFileSync(filePath, this.toJSON());
      console.log('Admin data saved successfully.');
    } catch (error) {
      console.error('Error saving admin data to file:', error.message);
    }
  }

  // Additional method to load admin data from a JSON file
  static loadFromFile(filePath) {
    try {
      const json = fs.readFileSync(filePath, 'utf8');
      return Admin.fromJSON(json);
    } catch (error) {
      console.error('Error loading admin data from file:', error.message);
      return null;
    }
  }
}

