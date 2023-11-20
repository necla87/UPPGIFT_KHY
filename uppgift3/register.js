$(document).ready(function () {
  $('#register-form').submit(function (event) {
    event.preventDefault(); 
    var playerName = $('#player-name').val();
    registerNewPlayer(playerName);
  });
});

function registerNewPlayer(playerName) {
  $.ajax({
    url: 'http://localhost:3000/players', 
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ name: playerName }),
    success: function (response) {
      console.log('Registration Success:', response);
      $('#registration-status').text('Player ' + playerName + ' registered successfully!');
    },
    error: function (error) {
      console.log('Error registering player:', error);
      $('#registration-status').text('Error registering player. Please try again.');
    }
  });
}
