$(document).ready(function () {
  loadTopPlayers();
});

function loadTopPlayers() {
  $.ajax({
    url: 'http://localhost:3000/players', 
    method: 'GET',
    success: function (players) {
      console.log('Top Players:', players);
      players.sort(function (a, b) {
        return b.score - a.score;
      });
      displayTopPlayers(players);
    },
    error: function (error) {
      console.log('Error loading top players list:', error);
    }
  });
}

function displayTopPlayers(players) {
  var topPlayersContainer = $('#top-players-container');
  topPlayersContainer.empty();

  if (players.length === 0) {
    topPlayersContainer.append('<p>No top players available.</p>');
  } else {
    var topPlayersList = $('<ul></ul>');
    players.forEach(function (player, index) {
      topPlayersList.append('<li>' + (index + 1) + '. ' + player.name + ' - Score: ' + player.score + '</li>');
    });
    topPlayersContainer.append(topPlayersList);
  }
}
