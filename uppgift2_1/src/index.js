import promptSync from 'prompt-sync';
import { readFileSync, writeFileSync } from 'fs';
import User from './src/user';
import Admin from './src/admin';
import EventTicket from './src/eventTicket';



const userDataFilePath = './data/users.json';  // Define the path here
const adminDataFilePath = './data/admin.json';
const eventTicketDataFilePath = './data/eventTickets.json';

const prompt = promptSync();

// Load existing user data from file or create a new user
let currentUser = User.loadFromFile(userDataFilePath);
if (!currentUser) {
  createUser();
}

// Load existing admin data from file or create a new admin
let currentAdmin = Admin.loadFromFile(adminDataFilePath);
if (!currentAdmin) {
  createAdmin();
}

// Load existing event ticket data from file or create new event tickets
let eventTickets = EventTicket.loadFromFile(eventTicketDataFilePath);
if (!eventTickets) {
  eventTickets = createInitialEventTickets();
}

// Main program loop
while (true) {
  console.log('\nWelcome to the Event Ticket System!');
  console.log('1. View Available Events');
  console.log('2. Buy Event Ticket');
  console.log('3. View Purchased Events (Admin)');
  console.log('4. Exit');

  const choice = prompt('Enter your choice: ');

  switch (choice) {
    case '1':
      viewAvailableEvents();
      break;
    case '2':
      buyEventTicket();
      break;
    case '3':
      if (currentAdmin) {
        viewPurchasedEvents();
      } else {
        console.log('You must be an admin to view purchased events.');
      }
      break;
    case '4':
      exitProgram();
      break;
    default:
      console.log('Invalid choice. Please enter a valid option.');
  }
}

// Function to create a new user
function createUser() {
  console.log('Create a New User:');
  const id = generateUniqueId();
  const username = prompt('Enter username: ');
  const password = prompt('Enter password: ');
  const email = prompt('Enter email: ');
  const phone = prompt('Enter phone: ');

  currentUser = new User(id, username, password, email, phone);
  currentUser.saveToFile(userDataFilePath);
}

// Function to create a new admin
function createAdmin() {
  console.log('Create a New Admin:');
  const username = prompt('Enter admin username: ');
  const password = prompt('Enter admin password: ');

  currentAdmin = new Admin(username, password);
  currentAdmin.saveToFile(adminDataFilePath);
}

// Function to generate a unique ID for users and events
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to create initial event tickets (for demonstration purposes)
function createInitialEventTickets() {
  const event1 = new EventTicket(generateUniqueId(), 'Concert', 50, '2023-12-15T20:00:00');
  event1.addAvailableSeats(100);

  const event2 = new EventTicket(generateUniqueId(), 'Sports Game', 30, '2023-12-20T18:00:00');
  event2.addAvailableSeats(50);

  const eventTickets = [event1, event2];
  eventTickets.forEach((event) => event.saveToFile(eventTicketDataFilePath));

  return eventTickets;
}

// Function to view available events
function viewAvailableEvents() {
  console.log('\nAvailable Events:');
  eventTickets.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name} - ${event.price} SEK - ${event.time}`);
  });
}

// Function to buy an event ticket
function buyEventTicket() {
  viewAvailableEvents();
  const eventIndex = prompt('Enter the number of the event you want to attend: ');

  const selectedEvent = eventTickets[eventIndex - 1];
  if (selectedEvent) {
    currentUser.buyEventTicket(selectedEvent);
    currentUser.saveToFile(userDataFilePath);
    selectedEvent.saveToFile(eventTicketDataFilePath);
  } else {
    console.log('Invalid event selection.');
  }
}

// Function to view purchased events (Admin only)
function viewPurchasedEvents() {
  console.log('\nPurchased Events:');
  eventTickets.forEach((event) => {
    console.log(`${event.name}:`);
    event.purchasedUsers.forEach((user) => {
      console.log(`- ${user.username}`);
    });
  });
}

// Function to exit the program
function exitProgram() {
  console.log('Thank you for using the Event Ticket System. Goodbye!');
  process.exit();
}