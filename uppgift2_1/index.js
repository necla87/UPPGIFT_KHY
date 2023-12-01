import fs from 'fs/promises';
import User from './user.js';
import Admin from './admin.js';
import EventTicket from './eventTicket.js';

const usersFile = 'users.json';
const eventsFile = 'events.json';

let loadedUsers = loadJSON(usersFile) || [];
let loadedEvents = loadJSON(eventsFile) || [];
let eventCounter = 1;

function loadJSON(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}: ${error.message}`);
    return null;
  }
}
async function saveJSON(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error(`Error writing to ${filename}: ${error.message}`);
  }
}



function login(username, password) {
  const admin = new Admin('admin_user', 'admin_password');
  const buyer = loadedUsers.find(user => user.username === username && user.password === password);

  if (admin.login(username, password)) {
    console.log('Admin logged in successfully!');
    return 'admin';
  } else if (buyer) {
    console.log('Buyer logged in successfully!');
    return 'buyer';
  } else {
    console.log('Invalid username or password.');
    return null;
  }
}

function createNewAccount(id, username, password, email, phone) {
  const newUser = new User(id, username, password, email, phone);
  loadedUsers.push(newUser);

  saveJSON(usersFile, loadedUsers);
  console.log('Account created successfully!');
}

function addEventTicket(eventName, price, eventTime, buyerId) {
  const eventId = generateUniqueId();
  const newEventTicket = new EventTicket(eventId, eventName, price, eventTime, buyerId);
  loadedEvents.push(newEventTicket);

  eventCounter++;

  saveJSON(eventsFile, loadedEvents);
  console.log('Event ticket added successfully!');
}


function generateUniqueId() {
  return `event_${eventCounter}`;
}

function viewUsersByEvent() {
  console.log('Users who bought tickets for each event:\n');

  loadedEvents.forEach((event) => {
    const usersForEvent = getUsersForEvent(event.buyerId);

    console.log(`Event: ${event.eventName}`);
    console.log('Users:');

    if (usersForEvent.length === 0) {
      console.log('No users bought tickets for this event.\n');
    } else {
      usersForEvent.forEach(printUserInfo);
      console.log('\n');
    }
  });
}
function getUsersForEvent(buyerId) {
  return loadedUsers.filter((user) => user.username === buyerId);
}


function printUserInfo(user) {
  console.log(`- User ID: ${user.id}, Username: ${user.username}`);
}

createNewAccount(1, 'Sami', 'dnvkdnf', 'exam@email.com', '123456789');
login('Sami', 'dnvkdnf');
createNewAccount(2, 'Ahmet', 'kdlvjaivf', 'ahmet@yahaa.com', '555-1234');

createNewAccount(3, 'Merve', 'adnvonadv', 'merve@gmaid.com', '555-5678');
createNewAccount(4, 'Özgur', 'pfvoakdvu', 'ozgur@mymy.com', '555-9101');


// Example: Add event tickets with shorter event time representations
addEventTicket('Rock Concert', 50, '12/01/2023 19:00', 'Sami');
addEventTicket('Classical Music Night', 75, '12/10/2023 20:30', 'Ahmet');
addEventTicket('Comedy Show', 40, '12/05/2023 18:00', 'Merve');



// View users for the added event
viewUsersByEvent();
