$(document).ready(function () {
  loadGameHistory();
});

function loadGameHistory() {
  $.ajax({
    url: 'http://localhost:3000/players',
    method: 'GET',
    success: function (players) {
      console.log('Players:', players);
      displayGameHistory(players);
    },
    error: function (error) {
      console.log('Error loading game history:', error);
    }
  });
}

function displayGameHistory(players) {
  var gameHistoryContainer = $('#game-history-container');
  gameHistoryContainer.empty();

  players.forEach(function (player) {
    if (!player) {
      console.log('Player object is undefined or null.');
      return;
    }

    var playerHistory = $('<div class="player-history"></div>');

    if (!player.name) {
      console.log('Player name is missing.');
      return;
    }

    playerHistory.append('<h2>' + player.name + '</h2>');

    if (!player.gameHistory || player.gameHistory.length === 0) {
      playerHistory.append('<p>No game history available.</p>');
    } else {
      var historyList = $('<ul></ul>');
      player.gameHistory.forEach(function (result) {
        historyList.append('<li>' + result + '</li>');
      });
      playerHistory.append(historyList);
    }

    gameHistoryContainer.append(playerHistory);
  });
}
