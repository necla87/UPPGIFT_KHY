$(document).ready(function () {
  loadAllPlayers();
});

function loadAllPlayers() {
  $.ajax({
    url: 'http://localhost:3000/players', 
    method: 'GET',
    success: function (data) {
      displayPlayers(data);
    },
    error: function (error) {
      console.log('Error loading players:', error);
      $('#player-list').html('Error loading players. Please try again.');
    }
  });
}

function displayPlayers(players) {
  var playerListHtml = '<ul>';
  $.each(players, function (index, player) {
    playerListHtml += '<li>' + player.name + '</li>';
  });
  playerListHtml += '</ul>';
  $('#player-list').html(playerListHtml);
}
