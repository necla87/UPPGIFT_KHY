
import { readFileSync, writeFileSync } from 'fs';
import prompt from 'prompt-sync';
import User from './user.js';
import Admin from './admin.js';
import EventTicket from './eventTicket.js';

const promptSync = prompt();

const usersFilePath = '../data/users.json';
const adminFilePath = '../data/admin.json';
const eventTicketsFilePath = '../data/eventTickets.json';

let users = loadEntities(User, usersFilePath);
let admin = loadEntities(Admin, adminFilePath);
let eventTickets = loadEntities(EventTicket, eventTicketsFilePath);

mainMenu();

function mainMenu() {
  while (true) {
    console.log('\nEvent Ticket System Menu:');
    console.log('1. Create a new user account');
    console.log('2. Create a new admin account');
    console.log('3. Log in');
    console.log('4. Exit');

    const choice = promptSync('Enter your choice: ');

    switch (choice) {
      case '1':
        createUser();
        break;
      case '2':
        createAdmin();
        break;
      case '3':
        const username = promptSync('Enter username: ');
        const password = promptSync('Enter password: ');

        const currentUser = users.find(user => user.username === username && user.password === password);
        const adminUser = admin.find(admin => admin.username === username && admin.password === password);

        if (adminUser) {
          adminMenu(adminUser);
        } else if (currentUser) {
          userMenu(currentUser);
        } else {
          console.log('Invalid username or password. Please try again.');
        }
        break;
      case '4':
        saveEntities(users, usersFilePath);
        saveEntities(admin, adminFilePath);
        saveEntities(eventTickets, eventTicketsFilePath);
        console.log('Exiting Event Ticket System. Goodbye!');
        process.exit();
      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
}

function login() {
  const userType = promptSync('Enter user type (1 for regular user, 2 for admin): ');

  switch (userType) {
    case '1':
      return loginUser();
    case '2':
      return loginAdmin();
    default:
      console.log('Invalid user type. Please enter 1 for regular user or 2 for admin.');
      return null;
  }
}

function loginUser() {
  const username = promptSync('Enter username: ');
  const password = promptSync('Enter password: ');

  const currentUser = users.find(user => user.username === username && user.password === password);

  if (currentUser) {
    return currentUser;
  } else {
    console.log('Invalid username or password. Please try again.');
    return null;
  }
}

function loginAdmin() {
  const username = promptSync('Enter admin username: ');
  const password = promptSync('Enter admin password: ');

  const adminUser = admin.find(admin => admin.username === username && admin.password === password);

  if (adminUser) {
    return adminUser;
  } else {
    console.log('Invalid admin credentials. Please try again.');
    return null;
  }
}


function createUser() {
  console.log('\nCreate a New User:');

  const id = generateUniqueId();
  const username = promptSync('Enter username: ');
  const password = promptSync('Enter password: ');
  const email = promptSync('Enter email: ');
  const phone = promptSync('Enter phone: ');

  if (users.some(user => user.username === username)) {
    console.log('Username is already taken. Please choose a different one.');
    return;
  }

  const newUser = new User(id, username, password, email, phone);
  users.push(newUser);

  saveEntities(users, usersFilePath);

  console.log('Account created successfully!');
}

function createAdmin() {
  console.log('\nCreate a New Admin:');

  const username = promptSync('Enter admin username: ');
  const password = promptSync('Enter admin password: ');

  // Check if admin with the same username already exists
  if (admin.some(admin => admin.username === username)) {
    console.log('Admin username is already taken. Please choose a different one.');
    return;
  }

  const newAdmin = new Admin(username, password);
  admin.push(newAdmin);

  saveEntities(admin, adminFilePath);

  console.log('Admin account created successfully!');
}




function adminMenu(adminUser) {
  while (true) {
    console.log('\nAdmin Menu:');
    console.log('1. View Purchased Users');
    console.log('2. Create Event');
    console.log('3. Back to Main Menu');

    const choice = promptSync('Enter your choice: ');

    switch (choice) {
      case '1':
        adminUser.viewPurchasedUsers(users); // Pass the users array as a parameter
        break;
      case '2':
        createEvent();
        break;
      case '3':
        return;
      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
}


function createEvent() {
  console.log('\nCreate a New Event:');
  const eventName = promptSync('Enter event name: ');
  const eventPrice = parseFloat(promptSync('Enter event price: '));
  const eventTime = promptSync('Enter event time (YYYY-MM-DDTHH:mm:ss): ');

  const newEvent = new EventTicket(generateUniqueId(), eventName, eventPrice, new Date(eventTime).toISOString());
  eventTickets.push(newEvent);

  saveEntities(eventTickets, eventTicketsFilePath);

  console.log(`Event "${eventName}" added successfully!`);
}

function userMenu(currentUser) {
  console.log(`Welcome ${currentUser.username}!`);
  console.log('1. Buy Event Ticket');
  console.log('2. Back to Main Menu');

  const choice = promptSync('Enter your choice: ');

  switch (choice) {
    case '1':
      buyEventTicket(currentUser);
      break;
    case '2':
      break;
    default:
      console.log('Invalid choice. Please enter a valid option.');
  }
}

function buyEventTicket(currentUser) {
  console.log('Available Events:');
  eventTickets.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name} - ${event.price} SEK - ${event.time}`);
  });

  const eventIndex = promptSync('Enter the number of the event you want to attend: ');

  const selectedEvent = eventTickets[eventIndex - 1];
  if (selectedEvent) {
    currentUser.buyEventTicket(selectedEvent);
    console.log(`Ticket for ${selectedEvent.name} purchased successfully.`);
  } else {
    console.log('Invalid event selection.');
  }
}

function loadEntities(EntityClass, filePath) {
  try {
    const data = readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(data);
    const entities = jsonArray.map(json => EntityClass.fromJSON(json));
    console.log(`Loaded data from ${filePath}`);
    return entities;
  } catch (error) {
    console.error(`Error loading data from file ${filePath}: ${error.message}`);
    return [];
  }
}



function saveEntities(entities, filePath) {
  const jsonArray = entities.map(entity => entity.toJSON());
  try {
    writeFileSync(filePath, JSON.stringify(jsonArray, null, 2));
    console.log(`Data saved to file: ${filePath}`);
  } catch (error) {
    console.error(`Error saving data to file ${filePath}: ${error.message}`);
  }
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
