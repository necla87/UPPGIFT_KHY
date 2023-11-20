$(document).ready(function () {
  $('#register-form').submit(function (event) {
    event.preventDefault();

    var playerName = $('#player-name').val();

    if (playerName.trim() === '') {
      displayRegistrationStatus('Please enter a valid player name.');
      return;
    }


    var newPlayer = {
      name: playerName,
      gameHistory: [],
      score: 0
    };

    $.ajax({
      url: 'http://localhost:3000/players', 
      contentType: 'application/json',
      data: JSON.stringify(newPlayer),
      success: function (player) {
        displayRegistrationStatus('Player registered successfully!');
      },
      error: function (error) {
        console.log('Error registering player:', error);
        displayRegistrationStatus('Error registering player. Please try again.');
      }
    });
  });

  function displayRegistrationStatus(message) {
    $('#registration-status').text(message);
  }
});
