$(document).ready(function() {


  var createAndShowSecretWord = {
    wordBank : ['tacos', 'watermelon', 'hat'],
    generateRandomSecretWord : function () {
      var randomIndexNumber = Math.floor(createAndShowSecretWord.wordBank.length*(Math.random()));
      secretWord = createAndShowSecretWord.wordBank[randomIndexNumber];
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
      // called by start button click handler
      if (game.isOngoing === false) {
        game.isOngoing = true;
        game.createLetterBoard();
        createAndShowSecretWord.showHiddenLetterList();
        $('#startButton').remove();
        $('#buttonContainer').html('<button id="resetButton">Reset Game</button>');
      } else if (game.isOngoing === true) {
        return;
      }
    },

    createLetterBoard : function() {
      letterBoard.showLetters();
    },

    numberOfGuessesRemaining : 6,

    numberOfCorrectGuesses: 0,

    secretWord : createAndShowSecretWord.generateRandomSecretWord(),

    evaluateGuess : function (theClickedLetter, theSecretWord) {
      var numberLettersTheGuessDoesNotMatch = 0;
      for (var i=0; i<theSecretWord.length; i++) {
        if(theClickedLetter === (theSecretWord[i]).toUpperCase()){
          console.log('match');
           $('#letter-'+i).html(theSecretWord[i]);
           game.numberOfCorrectGuesses ++;
           if (game.numberOfCorrectGuesses === theSecretWord.length) {
             alert('you win!');
             game.endGame();
            }
          }
        else if (theClickedLetter !== (theSecretWord[i]).toUpperCase()){
          numberLettersTheGuessDoesNotMatch ++;
        }
      }
      if (numberLettersTheGuessDoesNotMatch === theSecretWord.length) {
        console.log('miss');
        game.numberOfGuessesRemaining --;
        $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
      }
      if (game.numberOfGuessesRemaining === 0) {
        alert('you lose');
        game.endGame();
      }
    },

    endGame : function () {
      alert('game over');
      game.isOngoing = false;
      $('#letterBoard').html('');
      $('#hiddenLetterList').html(game.secretWord);

    },

    resetGame : function () {
      //called by reset button click
      console.log('reset');
      game.SecretWord = createAndShowSecretWord.generateRandomSecretWord();
      game.startGame();
    }

  };



  var letterBoard = {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    showLetters : function() {
      for (var i=0; i<letterBoard.lettersArray.length; i++) {
        $('#letterBoard').append('<button class="btn">'+letterBoard.lettersArray[i]+'</button>');
      }
    },
    disableGuessedLetters : function (theClickedLetter) {
      theClickedLetter.addClass('btn disabled');
    }
  };




  var scoreBoard = {
    //Ice Box
  };



  var buttonHandlers = {
    startClickHandler : function(event) {
      event.preventDefault();
      game.startGame();
    },
    letterClickHandler : function (event) {
      event.preventDefault();
      var $theClickedLetter = $(event.target);
      game.evaluateGuess($theClickedLetter.html(), game.secretWord);
      console.log($theClickedLetter.html());
      letterBoard.disableGuessedLetters($theClickedLetter);
    }
  };

  // var secretWordAsArray = secretWord.split("");

  $('#startButton').on('click', buttonHandlers.startClickHandler);
  $('#letterBoard').on('click', buttonHandlers.letterClickHandler);
  $('#buttonContainer').on('click', '#resetButton', game.resetGame);
  //put reset button click event handler here and call resetClickHandler



//below is the end of the document.ready function
});
