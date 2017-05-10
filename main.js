$(document).ready(function() {


  var createAndShowSecretWord = {
    wordBank : ['tacos', 'watermelon', 'hat'],
    generateRandomSecretWord : function () {
      //will get random secret word from word bank and
      //add hidden letter list to game board
      var randomIndexNumber = Math.floor(createAndShowSecretWord.wordBank.length*(Math.random()));
      secretWord = createAndShowSecretWord.wordBank[randomIndexNumber];
      return secretWord;
      // createAndShowSecretWord.returnTheSecretWord(theSecretWord);
    },
    // returnTheSecretWord : function (theSecretWord) {
    //   console.log('returnTheSecretWord has: '+theSecretWord);
    //   return theSecretWord;
    //   this is not working
    // },

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
      //should call generateRandomSecretWord and createLetterBoard
      if (game.isOngoing === false) {
        game.isOngoing = true;
        game.createLetterBoard();
        createAndShowSecretWord.showHiddenLetterList();
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
      var lettersTheGuessDoesNotMatch = 0;
      for (var i=0; i<theSecretWord.length; i++) {
          if(theClickedLetter === (theSecretWord[i]).toUpperCase()){
            console.log('match');
            $('#letter-'+i).html(theSecretWord[i]);
            game.numberOfCorrectGuesses ++;
            if (game.numberOfCorrectGuesses === theSecretWord.length) {
              alert('you win!');
            }
            //this needs to be fixed - does not recognize if correct letter appears more than once
          }
        else if (theClickedLetter !== (theSecretWord[i]).toUpperCase()){
          lettersTheGuessDoesNotMatch ++;
        }
      }
      if (lettersTheGuessDoesNotMatch === theSecretWord.length) {
        console.log('miss');
        game.numberOfGuessesRemaining --;
        $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
      }
      if (game.numberOfGuessesRemaining === 0) {
        game.endGame();
      }
    },

    endGame : function () {
      alert('game over');
      //win vs loss?
      //create reset button
      game.isOngoing = false;
    },

    resetGame : function () {
      //
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
    resetClickHandler : function() {
      //event handler for reset button click
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
  //put reset button click event handler here and call resetClickHandler



//below is the end of the document.ready function
});
