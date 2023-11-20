$(document).ready(function () {
 
  var currentPlayer;
  var playerX;
  var playerO;
  var gameBoard;
  var gameStarted = false;

  initializeGame();

  function initializeGame() {
    loadPlayerNames();

    $('#start-btn').on('click', function () {
      startGame();
    });

    $('.cell').on('click', function () {
      var cellIndex = $(this).data('index');

      if (gameStarted && gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = getCurrentPlayerSymbol();
        renderGameBoard();
        if (checkForWin()) {
          endGame('win');
        } else if (checkForDraw()) {
          endGame('draw');
        } else {
          switchPlayer();
        }
      }
    });
    
    $('#reset-btn').on('click', function () {
      resetGame();
    });
  }

  function loadPlayerNames() {
    $.ajax({
      url: 'http://localhost:3000/players',
      method: 'GET',
      success: function (data) {
        console.log('Player Names:', data);
        var dropdown1 = $('#player-dropdown-1');
        dropdown1.empty();
        $.each(data, function (index, player) {
          dropdown1.append($('<option></option>').text(player.name).val(player.id));
        });
        var dropdown2 = $('#player-dropdown-2');
        dropdown2.empty();
        $.each(data, function (index, player) {
          dropdown2.append($('<option></option>').text(player.name).val(player.id));
        });

        playerX = data[0].id; 
        playerO = data[1].id; 

        currentPlayer = dropdown1.val();

        updateGameStatus();
      },
      error: function (error) {
        console.log('Error loading player names:', error);
      }
    });
  }

  function renderGameBoard() {
    for (var i = 0; i < gameBoard.length; i++) {
      $('#cell-' + i).text(gameBoard[i]);
    }
  }


  function startGame() {
    if (!gameStarted) {
      var selectedPlayer1 = $('#player-dropdown-1').val();
      var selectedPlayer2 = $('#player-dropdown-2').val();

      playerX = selectedPlayer1; 
      playerO = selectedPlayer2; 

      currentPlayer = playerX;

      updateGameStatus();
      gameStarted = true;

      gameBoard = ['', '', '', '', '', '', '', '', ''];

      renderGameBoard();

      $('#game-board').show();
      $('#reset-btn').show();
    }
  }


  function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderGameBoard();
    currentPlayer = playerX;
    updateGameStatus();
    gameStarted = false;
    $('#game-status').text('');
  }

  function getCurrentPlayerName() {
    var currentPlayerName = (currentPlayer === playerX) ? $('#player-dropdown-1 option:selected').text() : $('#player-dropdown-2 option:selected').text();
    return currentPlayerName;
  }


  function getCurrentPlayerSymbol() {
    return currentPlayer === playerX ? 'X' : 'O';
  }

  function switchPlayer() {
    var selectedPlayer1 = $('#player-dropdown-1').val();
    var selectedPlayer2 = $('#player-dropdown-2').val();

    currentPlayer = (currentPlayer === selectedPlayer1) ? selectedPlayer2 : selectedPlayer1;

    if (checkForWin()) {
      endGame('win');
    } else if (checkForDraw()) {
      endGame('draw');
    } else {
      renderGameBoard();

      updateGameStatus();
    }
  }



  function updateGameStatus() {
    $('#game-status').text('Current Player: ' + getCurrentPlayerName());
  }

  function isGameOver() {
    return checkForWin() || checkForDraw();
  }

  function checkForWin() {
    return checkRows() || checkColumns() || checkDiagonals();
  }

  function checkRows() {
    for (var i = 0; i < 9; i += 3) {
      if (gameBoard[i] !== '' && gameBoard[i] === gameBoard[i + 1] && gameBoard[i + 1] === gameBoard[i + 2]) {
        endGame('win');
        return true;
      }
    }
    return false;
  }

  function checkColumns() {
    for (var i = 0; i < 3; i++) {
      if (gameBoard[i] !== '' && gameBoard[i] === gameBoard[i + 3] && gameBoard[i + 3] === gameBoard[i + 6]) {
        endGame('win');
        return true;
      }
    }
    return false;
  }

  function checkDiagonals() {
    if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
      endGame('win');
      return true;
    }
    if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
      endGame('win');
      return true;
    }
    return false;
  }


  function checkForDraw() {
    return gameBoard.every(function (cell) {
      return cell !== '';
    });
  }

  function endGame(result) {
    var currentPlayerName = getCurrentPlayerName();
    var gameResult = result === 'draw' ? 'Draw' : currentPlayerName + ' wins';

    if (result === 'win') {
      showAlert(gameResult);
      updateScore(currentPlayer);
    } else {
      showAlert(gameResult);
    }

    $.ajax({
      url: 'http://localhost:3000/players/' + currentPlayer,
      method: 'GET',
      success: function (player) {
        player.gameHistory.push(gameResult);
        updateGameHistory(player);
      },
      error: function (error) {
        console.log('Error updating game history:', error);
      }
    });

    setTimeout(function () {
      resetGame();
    }, 5000); 
  }


  function updateGameHistory(player) {
    $.ajax({
      url: 'http://localhost:3000/players/' + player.id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(player),
      success: function (updatedPlayer) {
        console.log('Game history and score updated:', updatedPlayer);
      },
      error: function (error) {
        console.log('Error updating game history and score:', error);
      }
    });
  }

  function showAlert(message) {
    $('#alert').text(message).show();
  }

  function updateScore(playerId) {
    $.ajax({
      url: 'http://localhost:3000/players/' + playerId,
      method: 'GET',
      success: function (player) {
        player.score += 1;
        updatePlayerScore(player);
      },
      error: function (error) {
        console.log('Error updating player score:', error);
      }
    });
  }

  function updatePlayerScore(player) {
    $.ajax({
      url: 'http://localhost:3000/players/' + player.id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(player),
      success: function (updatedPlayer) {
        console.log('Player score updated:', updatedPlayer);
      },
      error: function (error) {
        console.log('Error updating player score:', error);
      }
    });
  }
});
