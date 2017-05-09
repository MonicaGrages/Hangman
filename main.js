$(document).ready(function() {



  var createAndShowSecretWord = {
    wordBank : ['tacos'],
    generateRandomSecretWord : function () {
      //will get random secret word from word bank and
      //add hidden letter list to game board
      var randomIndexNumber = Math.floor(createAndShowSecretWord.wordBank.length*(Math.random()));
      var theSecretWord = createAndShowSecretWord.wordBank[randomIndexNumber];
      // createAndShowSecretWord.returnTheSecretWord(theSecretWord);
      createAndShowSecretWord.showHiddenLetterList(theSecretWord);
      return theSecretWord;
    },
    // returnTheSecretWord : function (theSecretWord) {
    //   console.log('returnTheSecretWord has: '+theSecretWord);
    //   return theSecretWord;
    //   //this is just storing the secret word so it can be called from other functions
    // },


    showHiddenLetterList : function(theSecretWord) {
      for (var i=0; i<theSecretWord.length; i++) {
        $('#hiddenLetterList').append('_ '); //add an underscore for each letter in the secret word
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
        createAndShowSecretWord.generateRandomSecretWord();
      } else if (game.isOngoing === true) {
        return;
      }
    },

    createLetterBoard : function() {
      //will make the letter board show up after game starts
      //could just add a class to an already existing letter board that makes its visibility not hidden?
      letterBoard.showLetters();
    },

    evaluateGuess : function (theClickedLetter, theSecretWord) {
      //how do I get the secret word here?
      for (var i=0; i<theSecretWord.length; i++) {
        if (theClickedLetter === (theSecretWord[i]).toUpperCase()) {
          console.log('match');

          return;
        }
      }
      console.log('miss');
    },

    endGame : function () {
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
        $('#letterBoard').append('<button>'+letterBoard.lettersArray[i]+'</button>');
      }
    },
  };









  var scoreBoard = {
    //Ice Box
  };



  var buttonHandlers = {
    startClickHandler : function() {
      game.startGame();
    },
    resetClickHandler : function() {
      //event handler for reset button click
    },
    letterClickHandler : function ($event) {
      var $theClickedLetter = $(event.target);
      game.evaluateGuess($theClickedLetter.html(), 'tacos');
      //thesecretword needs to be passed in too though);
      //this return secret word is not working
    }
  };




  $('#startButton').on('click', buttonHandlers.startClickHandler);
  $('#letterBoard').on('click', buttonHandlers.letterClickHandler);
  //put reset button click event handler here and call resetClickHandler



//below is the end of the document.ready function
});
