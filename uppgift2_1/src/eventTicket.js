import fs from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';
export default class EventTicket {
  constructor(id, name, price, time) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.time = time;
    this.availableSeats = 0; // Initialize with zero available seats
    this.purchasedUsers = []; // Array to store users who purchased tickets
  }

  // Method to add available seats for the event
  addAvailableSeats(seats) {
    this.availableSeats += seats;
    console.log(`Added ${seats} available seats for ${this.name}.`);
  }

  // Serialization method to convert EventTicket object to JSON
  toJSON() {
    return JSON.stringify(this);
  }

  // Deserialization method to create an EventTicket object from JSON
  static fromJSON(json) {
    const eventData = JSON.parse(json);
    const eventTicket = new EventTicket(eventData.id, eventData.name, eventData.price, eventData.time);
    eventTicket.availableSeats = eventData.availableSeats || 0;
    eventTicket.purchasedUsers = eventData.purchasedUsers || [];
    return eventTicket;
  }

  // Additional method to save event ticket data to a JSON file
  saveToFile(filePath) {
    try {
      fs.writeFileSync(filePath, this.toJSON());
      console.log('Event ticket data saved successfully.');
    } catch (error) {
      console.error('Error saving event ticket data to file:', error.message);
    }
  }

  // Additional method to load event ticket data from a JSON file
  static loadFromFile(filePath) {
    try {
      const json = fs.readFileSync(filePath, 'utf8');
      return EventTicket.fromJSON(json);
    } catch (error) {
      console.error('Error loading event ticket data from file:', error.message);
      return null;
    }
  }
}