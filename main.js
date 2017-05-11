$(document).ready(function() {


  var secretWordStuff = {
    wordBank : ['tacos', 'watermelon', 'hat', 'advice', 'javascript', 'array', 'podcast', 'grandmother', 'wolf', 'satellite'],
    generateRandomSecretWord : function () {
      var randomIndexNumber = Math.floor(secretWordStuff.wordBank.length*(Math.random()));
      secretWord = secretWordStuff.wordBank[randomIndexNumber];
      return secretWord;
    },


    showHiddenLetterList : function() {
      var hiddenLetterArray = [];
      for (var i=0; i<game.secretWord.length; i++) {
        hiddenLetterArray.push('_ ');
        $('#hiddenLetterList').append('<span id=letter-'+i+'>'+hiddenLetterArray[i]+'</span>');
      }
    }
  };


  var game = {
    isOngoing : false,
    startGame : function () {
        game.isOngoing = true;
        secretWordStuff.showHiddenLetterList();
        letterBoard.showLetters();
        $('#startButton').remove();
        $('#resetButtonContainer').html('<button id="resetButton" class="button btn">Reset Game</button>');
        $('#letterBoard').prop('disabled', false);
    },
    numberOfGuessesRemaining : 6,
    numberOfCorrectGuesses: 0,
    secretWord : secretWordStuff.generateRandomSecretWord(),
    evaluateGuess : function (theClickedLetter, theSecretWord) {
      var numberLettersTheGuessDoesNotMatch = 0;
      for (var i=0; i<theSecretWord.length; i++) {
        if(theClickedLetter === (theSecretWord[i]).toUpperCase()){
           $('#letter-'+i).html(theSecretWord[i]);
           game.numberOfCorrectGuesses ++;
           if (game.numberOfCorrectGuesses === theSecretWord.length) {
             game.endGame("You Win!");
             scoreBoard.incrementWinScore();
            }
          }
        else if (theClickedLetter !== (theSecretWord[i]).toUpperCase()){
          numberLettersTheGuessDoesNotMatch ++;
        }
      }
      if (numberLettersTheGuessDoesNotMatch === theSecretWord.length) {
        if (game.numberOfGuessesRemaining >= 1) {
          game.numberOfGuessesRemaining --;
          $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
          $('#hangman-display').attr('src', 'images/Hangman-'+game.numberOfGuessesRemaining+'.png');
        }
      }
      if (game.numberOfGuessesRemaining === 0) {
        game.endGame('You Lose');
        scoreBoard.incrementLoseScore();
      }
    },
    endGame : function (winOrLossMessage) {
      game.isOngoing = false;
      $('#letterBoard').prop('disabled', true);
      $('#letterBoard').html('<span class="winOrLossMessage">'+winOrLossMessage+'</span>');
      $('#hiddenLetterList').html(game.secretWord);
      $('#resetButton').html('Play Again');
    },
    resetGame : function () {
      //called by reset button click
      game.secretWord = secretWordStuff.generateRandomSecretWord();
      $('#hiddenLetterList').empty();
      $('#letterBoard').empty();
      game.numberOfGuessesRemaining = 6;
      $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
      $('#hangman-display').attr('src', "images/Hangman-6.png");
      game.numberOfCorrectGuesses = 0;
      game.startGame();
    }
  };



  var letterBoard = {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    showLetters : function() {
      for (var i=0; i<letterBoard.lettersArray.length; i++) {
        $('#letterBoard').append('<button class="letter btn">'+letterBoard.lettersArray[i]+'</button>');
      }
      $('#letterBoard').prop('disabled', false);
    },
    disableGuessedLetters : function (theClickedLetter) {
        theClickedLetter.addClass('btn disabled');
        theClickedLetter.prop('disabled', true);
    }
  };

  var difficulty = {
    difficultyLevel : 'easy',
    setDifficulty : function(theClickedDifficulty) {
      //only change difficulty if game is not ongoing, or if player confirms game reset
      if (game.isOngoing === true) {
        if (confirm("Are you sure? This will reset your game.") === true) {
          theClickedDifficulty.addClass('clicked');
          if (theClickedDifficulty.attr('id') === 'hard') {
            difficulty.difficultyLevel = 'hard';
            $('#easy').removeClass('clicked');
          } else if (theClickedDifficulty.attr('id') === 'easy') {
            difficulty.difficultyLevel = 'easy';
            $('#hard').removeClass('clicked');
          }
          difficulty.handleDifficultyChange();
        }
      } else if (game.isOngoing === false) {
        theClickedDifficulty.addClass('clicked');
        if (theClickedDifficulty.attr('id') === 'hard') {
          difficulty.difficultyLevel = 'hard';
          $('#easy').removeClass('clicked');
        } else if (theClickedDifficulty.attr('id') === 'easy') {
          difficulty.difficultyLevel = 'easy';
          $('#hard').removeClass('clicked');
        }
      }
    },
    handleDifficultyChange : function () {
      game.resetGame();
      console.log('change difficulty and reset game')
    }
  }


  var scoreBoard = {
    gamesWon : 0,
    gamesLost : 0,
    incrementWinScore : function() {
      scoreBoard.gamesWon++;
      $('#number-of-games-won').html(scoreBoard.gamesWon);
    },
    incrementLoseScore : function() {
      scoreBoard.gamesLost++;
      $('#number-of-games-lost').html(scoreBoard.gamesLost);
    },
    resetScore : function() {
      scoreBoard.gamesWon = 0;
      scoreBoard.gamesLost = 0;
      $('#number-of-games-won').html(scoreBoard.gamesWon);
      $('#number-of-games-lost').html(scoreBoard.gamesLost);
    }
  };



  var buttonHandlers = {
    startClickHandler : function(event) {
      game.startGame();
    },
    letterClickHandler : function (event) {
      event.stopPropagation();
      var $theClickedLetter = $(event.target);
      if (game.isOngoing === true && $theClickedLetter.attr('id') !== 'letterBoard') { //so nothing happens if user clicks on letterBoard parent div instead of letter button
        game.evaluateGuess($theClickedLetter.html(), game.secretWord);
        letterBoard.disableGuessedLetters($theClickedLetter);
      }
    },
    resetClickHandler : function (event) {
      if (game.isOngoing === true){
        if (confirm('Are you sure you want to reset the game?') === true) {
          game.resetGame();
        } else {
          return;
        }
      } else if (game.isOngoing === false) {
        game.resetGame();
      }
    },
    resetScoreBoardHandler : function(event) {
      scoreBoard.resetScore();
    },
    difficultyButtonHandler : function(event) {
      event.preventDefault();
      event.stopPropagation();
      var $theClickedDifficultyButton = $(event.target);
      //only change the difficulty if different from the current difficulty
      if ($theClickedDifficultyButton.attr('id') === difficulty.difficultyLevel) {
        return;
      } else if ($theClickedDifficultyButton.attr('id') !== difficulty.difficultyLevel) {
        difficulty.setDifficulty($theClickedDifficultyButton);
      }
    }
  };


  $('#startButton').on('click', buttonHandlers.startClickHandler);
  $('#letterBoard').on('click', buttonHandlers.letterClickHandler);
  $('#resetButtonContainer').on('click', '#resetButton', buttonHandlers.resetClickHandler);
  $('#reset-score-board').on('click', buttonHandlers.resetScoreBoardHandler);
  $('.difficulty-button').on('click', buttonHandlers.difficultyButtonHandler);



//below is the end of the document.ready function
});
