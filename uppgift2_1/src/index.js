import { readFileSync, writeFileSync } from 'fs';
import prompt from 'prompt-sync';
import User from './user.js';
import Admin from './admin.js';
import EventTicket from './eventTicket.js';

const promptSync = prompt();

const usersFilePath = '../data/users.json';
const adminsFilePath = '../data/admins.json';
const eventTicketsFilePath = '../data/eventTickets.json';

let users = loadEntities(User, usersFilePath);
let admins = loadEntities(Admin, adminsFilePath);
let eventTickets = loadEntities(EventTicket, eventTicketsFilePath);
let eventIdCounter = getMaxEventId(eventTickets) + 1;

mainMenu();

function mainMenu() {
  while (true) {
    console.log('\nEvent Ticket System Menu:');
    console.log('1. Login as User');
    console.log('2. Login as Admin');
    console.log('3. Create a User');
    console.log('4. Create an Admin');
    console.log('5. Exit');

    const choice = promptSync('Enter your choice: ');

    switch (choice) {
      case '1':
        loginUser();
        break;
      case '2':
        loginAdmin();
        break;
      case '3':
        createUser();
        break;
      case '4':
        createAdmin();
        break;
      case '5':
        saveEntities(users, usersFilePath);
        saveEntities(admins, adminsFilePath);
        saveEntities(eventTickets, eventTicketsFilePath);
        console.log('Exiting Event Ticket System. Goodbye!');
        process.exit();
      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
}

function createUser() {
  console.log('\nCreate a New User:');

  const id = generateUserId();
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

  if (admins.some(admin => admin.username === username)) {
    console.log('Admin username is already taken. Please choose a different one.');
    return;
  }

  const newAdmin = new Admin(username, password);
  admins.push(newAdmin);

  saveEntities(admins, adminsFilePath);

  console.log('Admin account created successfully!');
}

function loginUser() {
  const username = promptSync('Enter username: ');
  const password = promptSync('Enter password: ');

  const currentUser = users.find(user => user.username === username && user.password === password);

  if (currentUser) {
    userMenu(currentUser);
  } else {
    console.log('Invalid username or password. Please try again.');
  }
}

function loginAdmin() {
  const username = promptSync('Enter admin username: ');
  const password = promptSync('Enter admin password: ');

  const adminUser = admins.find(admin => admin.username === username && admin.password === password);

  if (adminUser) {
    adminMenu(adminUser);
  } else {
    console.log('Invalid admin credentials. Please try again.');
  }
}

function userMenu(currentUser) {
  console.log(`Welcome ${currentUser.username}!`);

  while (true) {
    console.log('1. Buy Event Ticket');
    console.log('2. Log out and back to Main Menu');

    const choice = promptSync('Enter your choice: ');

    switch (choice) {
      case '1':
        buyEventTicket(currentUser);
        break;
      case '2':
        return;
      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
}

function adminMenu(adminUser) {
  console.log(`Welcome ${adminUser.username}!`);

  while (true) {
    console.log('1. Create Event');
    console.log('2. View Purchased Users');
    console.log('3. Log out and back to Main Menu');

    const choice = promptSync('Enter your choice: ');

    switch (choice) {
      case '1':
        createEvent();
        break;
      case '2':
        adminUser.viewPurchasedUsers(users);
        break;
      case '3':
        return; 
      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
}


function loadEntities(EntityClass, filePath) {
  try {
    const data = readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(data);
    return jsonArray.map(json => EntityClass.fromJSON(json));
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

function generateUserId() {
  return (users.length + 1).toString();
}

function getMaxEventId(eventTickets) {
  return Math.max(...eventTickets.map(event => event.id), 0);
}

function buyEventTicket(currentUser) {
  const allEvents = loadEntities(EventTicket, eventTicketsFilePath);

  console.log('Available Events:');
  allEvents.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name} - ${event.price} SEK - ${event.time}`);
  });

  const eventIndex = promptSync('Enter the number of the event you want to attend: ');

  const selectedEvent = allEvents[eventIndex - 1];
  if (selectedEvent) {
    selectedEvent.buyerId = currentUser.id;

   saveEntities(allEvents, eventTicketsFilePath);

    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) { 
        user.eventTickets.push({
          id: selectedEvent.id,
          name: selectedEvent.name,
          price: selectedEvent.price,
          time: selectedEvent.time,
        });
      }
      return user;
    });

    saveEntities(updatedUsers, usersFilePath);

    console.log(`Ticket for ${selectedEvent.name} purchased successfully.`);
  } else {
    console.log('Invalid event selection.');
  }
}


function createEvent() {
  console.log('\nCreate a New Event:');
  const eventName = promptSync('Enter event name: ');
  const eventPrice = parseFloat(promptSync('Enter event price: '));
  const eventTime = promptSync('Enter event time (YYYY-MM-DDTHH:mm:ss): ');

  const newEvent = new EventTicket(generateEventId(), eventName, eventPrice, new Date(eventTime).toISOString());
  eventTickets.push(newEvent);

  saveEntities(eventTickets, eventTicketsFilePath);

  console.log(`Event "${eventName}" added successfully!`);
}


